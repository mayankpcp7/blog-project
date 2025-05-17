// middleware.ts
import { verify } from "hono/jwt";
import { Hono } from "hono";
import type { Context, Next } from "hono";

// Optional: define environment types if you're using `c.env.JWT_SECRET`
type Env = {
  Bindings: {
    JWT_SECRET: string;
  };
};

// 👇 app has a type of Hono<Env>
export function initMiddleware(app: Hono<Env>) {
  app.use("/api/v1/blog/*", async (c: Context, next: Next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];

    try {
      const response = await verify(token, c.env.JWT_SECRET);
      if (response && typeof response === "object" && "id" in response) {
        await next();
      } else {
        return c.json({ error: "unauthorized" }, 403);
      }
    } catch (e) {
      return c.json({ error: "invalid or expired token" }, 403);
    }
  });
}
