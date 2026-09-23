import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/sources/electron-shadcn";

export const { GET } = createFromSource(source, {
  language: "english",
});
