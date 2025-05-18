import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const getPrisma = (c: any) =>
  new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

// Signup route
userRouter.post("/signup", async (c) => {
  const prisma = getPrisma(c);
  const body = await c.req.json();

  if (!body.email || !body.password) {
    c.status(400);
    return c.json({ error: "Email and password are required" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ jwt: token });
});

// Signin route
userRouter.post("/signin", async (c) => {
  const prisma = getPrisma(c);
  const body = await c.req.json();

  if (!body.email || !body.password) {
    c.status(400);
    return c.json({ error: "Email and password are required" });
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "Invalid email or password" });
  }

  // Compare password with hash
  const validPassword = await bcrypt.compare(body.password, user.password);

  if (!validPassword) {
    c.status(403);
    return c.json({ error: "Invalid email or password" });
  }

  // Sign JWT
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});
