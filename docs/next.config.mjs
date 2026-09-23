import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();
const withVarlock = varlockNextConfigPlugin();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/electron-shadcn/docs",
      destination: "/electron-shadcn/docs/overview",
      permanent: true,
    },
  ],
};

export default withVarlock(withMDX(config));