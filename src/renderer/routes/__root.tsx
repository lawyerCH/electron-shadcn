import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Activity } from "react";
import BaseLayout from "@/renderer/layouts/base-layout";
import { inDevelopment } from "@/shared/constants";

function Root() {
  return (
    <BaseLayout>
      <Outlet />
      <Activity mode={inDevelopment ? "visible" : "hidden"}>
        <TanStackRouterDevtools />
      </Activity>
    </BaseLayout>
  );
}

export const Route = createRootRoute({
  component: Root,
});
