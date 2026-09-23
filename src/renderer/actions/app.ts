import { ipc } from "@/renderer/ipc-manager";

export function getPlatform() {
  return ipc.client.app.currentPlatfom();
}

export function getAppVersion() {
  return ipc.client.app.appVersion();
}
