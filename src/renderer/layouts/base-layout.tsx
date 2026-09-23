import type React from "react";
import DragWindowRegion from "@/renderer/components/DragWindowRegion";
import NavigationMenu from "@/renderer/components/NavigationMenu";

/**
 * 应用级布局：
 *   1. DragWindowRegion — 自定义标题栏（Mac: 留空避开系统交通灯 / Win/Linux: 显示标题 + 窗口控制）
 *   2. NavigationMenu — 主导航，独立一行避免与交通灯 / 标题按钮冲突
 *   3. main — 页面内容，min-h-screen 让长内容可滚
 */
export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DragWindowRegion title="electron-shadcn" />
      <NavigationMenu />
      <main className="flex-1 px-4 pb-20">{children}</main>
    </div>
  );
}
