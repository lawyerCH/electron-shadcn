import type { LoadExtensionOptions, Session } from "electron";
import { session } from "electron";
import {
  installExtension,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { inDevelopment } from "@/shared/constants";

/**
 * electron-devtools-installer v4 still calls the deprecated
 * Session.loadExtension / getAllExtensions / removeExtension APIs.
 * Bridge those onto Session.extensions so Electron 28+ stays warning-free.
 */
function withModernExtensionsApi(target: Session): Session {
  const { extensions } = target;

  return {
    getAllExtensions: () => extensions.getAllExtensions(),
    loadExtension: (extensionPath: string, options?: LoadExtensionOptions) =>
      extensions.loadExtension(extensionPath, options),
    on: (event: string, listener: (...args: unknown[]) => void) => {
      extensions.on(event as "extension-unloaded", listener as never);
      return target;
    },
    removeExtension: (extensionId: string) =>
      extensions.removeExtension(extensionId),
    removeListener: (event: string, listener: (...args: unknown[]) => void) => {
      extensions.removeListener(
        event as "extension-unloaded",
        listener as never
      );
      return target;
    },
  } as unknown as Session;
}

export async function installDevTools(): Promise<void> {
  if (!inDevelopment) {
    return;
  }

  try {
    const result = await installExtension(REACT_DEVELOPER_TOOLS, {
      session: withModernExtensionsApi(session.defaultSession),
    });
    console.log(`Extensions installed successfully: ${result.name}`);
  } catch {
    console.error("Failed to install extensions");
  }
}
