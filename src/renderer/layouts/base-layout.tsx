import type React from "react";
import DragWindowRegion from "@/renderer/components/DragWindowRegion";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DragWindowRegion title="electron-shadcn" />
      <main className="h-screen p-2 pb-20">{children}</main>
    </>
  );
}
