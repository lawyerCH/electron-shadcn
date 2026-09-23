import type { AppRoot } from "../../constants/routes";

export function mountRoute(appRoot: AppRoot, path: string) {
  return `${appRoot}${path}`;
}
