/**
 * IPC 上下文：主进程单例，存当前 BrowserWindow 引用。
 *
 * 注意：mainWindowMiddleware 是 **预创建** 的 oRPC middleware，handler
 * 通过 os.use() 引用它。middleware 自身的检查（window 是否已设）在
 * handler 真正被调用时才执行 —— 这样模块加载阶段不会抛错，主进程
 * 可以在 setupORPC 阶段先注册 handler，再 createWindow 设窗口。
 */
import { os } from "@orpc/server";
import type { BrowserWindow } from "electron";

class IPCContext {
  mainWindow: BrowserWindow | undefined;

  setMainWindow(window: BrowserWindow) {
    this.mainWindow = window;
  }

  /**
   * oRPC middleware: 注入当前 mainWindow 到 procedure context.
   * 在 handler 调用时执行，若 window 未设则抛错。
   * 模块加载阶段不抛错。
   */
  readonly mainWindowMiddleware = os.middleware(({ next, context }) => {
    const window = this.mainWindow;
    if (!window) {
      throw new Error("Main window is not set in IPC context.");
    }
    return next({
      context: {
        ...context,
        window,
      },
    });
  });
}

export const ipcContext = new IPCContext();
