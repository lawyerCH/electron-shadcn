import { os } from "@orpc/server";
import { ipcContext } from "../context";

export const minimizeWindow = os
  .use(ipcContext.mainWindowMiddleware)
  .handler(({ context }) => {
    context.window.minimize();
  });

export const maximizeWindow = os
  .use(ipcContext.mainWindowMiddleware)
  .handler(({ context }) => {
    if (context.window.isMaximized()) {
      context.window.unmaximize();
    } else {
      context.window.maximize();
    }
  });

export const closeWindow = os
  .use(ipcContext.mainWindowMiddleware)
  .handler(({ context }) => {
    context.window.close();
  });
