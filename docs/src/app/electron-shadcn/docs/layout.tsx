import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/sources/electron-shadcn";
import { baseLayoutProps } from "../layout.shared";

export default function Layout({
  children,
}: LayoutProps<"/electron-shadcn/docs">) {
  return (
    <DocsLayout tree={source.pageTree} {...baseLayoutProps()}>
      {children}
    </DocsLayout>
  );
}
