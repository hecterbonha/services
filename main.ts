import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { token } from "./verify-token.ts";

const app = new Hono();

app.use(
  "/api/*",
  bearerAuth({
    verifyToken: token.validate,
  }),
);

app.post("/auth/login", async (c) => {
  return c.json({
    token: await token.sign(),
  });
});
app.get("/api/hello", (c) => {
  const currentUser = c.get("user");
  return c.json({ message: "Hello", who: currentUser });
});

Deno.serve(app.fetch);
