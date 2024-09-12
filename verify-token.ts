import { Context } from "hono";
import { sign, verify } from "hono/jwt";

// const secretKey = Deno.env.get("SECRET_KEY");
const secretKey = "123";

export const token = {
    validate: async (token: string, c: Context) => {
        try {
            const decodedPayload = await verify(token, secretKey);
            c.set("user", decodedPayload.sub);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    sign: async () => {
        const payload = {
            sub: "user123",
            role: "admin",
            exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
        };
        return await sign(payload, secretKey);
    },
};
