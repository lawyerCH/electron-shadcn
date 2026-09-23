import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Activity } from "react";
import { TooltipProvider } from "@/renderer/components/ui/tooltip";
import BaseLayout from "@/renderer/layouts/base-layout";
import { inDevelopment } from "@/shared/constants";

function Root() {
  return (
    <TooltipProvider>
      <BaseLayout>
        <Outlet />
        <Activity mode={inDevelopment ? "visible" : "hidden"}>
          <TanStackRouterDevtools />
        </Activity>
      </BaseLayout>
    </TooltipProvider>
  );
}

export const Route = createRootRoute({
  component: Root,
});
