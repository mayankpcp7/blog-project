import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

type Variables = {
  userId: string;
};

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: Variables;
}>();

// Middleware: verify JWT and extract userId
blogRouter.use(async (c, next) => {
  const jwt = c.req.header("Authorization");

  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  const token = jwt.split(" ")[1];

  try {
    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload || typeof payload.id !== "string") {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }

    c.set("userId", payload.id);
    await next();
  } catch (err) {
    c.status(401);
    return c.json({ error: "invalid token" });
  }
});

// Initialize Prisma helper
const getPrisma = (c: any) =>
  new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

/**
 * Helper: Serialize blog to convert Date fields to string
 */
function serializeBlog(blog: { createdAt: any }) {
  return {
    ...blog,
    createdAt:
      blog.createdAt instanceof Date
        ? blog.createdAt.toISOString()
        : blog.createdAt,
  };
}

/**
 * Route: Create Blog
 */
blogRouter.post("/", async (c) => {
  const userId = c.get("userId");
  const prisma = getPrisma(c);
  const body = await c.req.json();

  const post = await prisma.post.create({
    data: {
      title: body.title ?? "Untitled",
      content: body.content ?? "",
      authorId: userId,
    },
  });

  return c.json({ id: post.id });
});

/**
 * Route: Update Blog
 */
blogRouter.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = getPrisma(c);
  const body = await c.req.json();

  await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.text("updated post");
});

/**
 * Route: Get Blogs by Logged-in User
 */
blogRouter.get("/myblogs", async (c) => {
  const userId = c.get("userId");
  const prisma = getPrisma(c);

  const blogs = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      content: true,
     createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedBlogs = blogs.map(serializeBlog);

  return c.json(serializedBlogs);
});

/**
 * Route: Get Blog by ID
 */
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = getPrisma(c);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return c.json(post);
});
