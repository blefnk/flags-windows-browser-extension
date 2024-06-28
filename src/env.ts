/* eslint-disable unicorn/prevent-abbreviations */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify the client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_EXT_URL: z.string().optional(),
  },

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtime
   * (for example the middlewares) or client-side so we need to destruct it manually.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_EXT_URL: process.env.NEXT_PUBLIC_EXT_URL,
    NODE_ENV: process.env.NODE_ENV,
  },

  /**
   * Specify the server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env.
   * Add ` on ID and SECRET if you want to make sure they're not empty.
   */
  server: {
    PORT: z.coerce.number().default(3000),
  },
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * uThis is especially useful for CI on Github or for the Docker builds.
   */
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
