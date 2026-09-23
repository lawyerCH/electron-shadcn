/**
 * 自定义标题栏：拖动区 + 窗口控制按钮（Win/Linux 显示，Mac 由系统接管）
 *
 * 防御性：当 platform 还没拿到时，不渲染 title 文本和按钮，避免
 * 在 Mac 上误显示为 Win 风格。
 */
import { type ReactNode, useEffect, useState } from "react";
import { getPlatform } from "@/renderer/actions/app";
import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
} from "@/renderer/actions/window";

interface DragWindowRegionProps {
  title?: ReactNode;
}

type Platform = "darwin" | "win32" | "linux" | string;

export default function DragWindowRegion({ title }: DragWindowRegionProps) {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    let active = true;
    getPlatform()
      .then((value: Platform) => {
        if (active) {
          setPlatform(value);
        }
      })
      .catch(() => {
        // IPC bridge not ready yet (dev startup race). Leave platform
        // null so we keep rendering the empty drag area instead of the
        // wrong variant.
      });
    return () => {
      active = false;
    };
  }, []);

  const platformKnown = platform !== null;
  const isMacOS = platform === "darwin";

  return (
    <div className="flex w-full items-stretch justify-between">
      <div className="draglayer w-full">
        {!isMacOS && platformKnown && title !== undefined && (
          <div className="flex flex-1 select-none whitespace-nowrap p-2 text-gray-400 text-xs">
            {title}
          </div>
        )}
        {isMacOS && (
          <div className="flex flex-1 p-2">
            {/* Maintain the same height but do not display content */}
          </div>
        )}
      </div>
      {!isMacOS && platformKnown && <WindowButtons />}
    </div>
  );
}

function WindowButtons() {
  return (
    <div className="flex">
      <button
        className="p-2 hover:bg-slate-300"
        onClick={minimizeWindow}
        title="Minimize"
        type="button"
      >
        <svg
          aria-hidden="true"
          height="12"
          role="img"
          viewBox="0 0 12 12"
          width="12"
        >
          <rect fill="currentColor" height="1" width="10" x="1" y="6" />
        </svg>
      </button>
      <button
        className="p-2 hover:bg-slate-300"
        onClick={maximizeWindow}
        title="Maximize"
        type="button"
      >
        <svg
          aria-hidden="true"
          height="12"
          role="img"
          viewBox="0 0 12 12"
          width="12"
        >
          <rect
            fill="none"
            height="9"
            stroke="currentColor"
            width="9"
            x="1.5"
            y="1.5"
          />
        </svg>
      </button>
      <button
        className="p-2 hover:bg-red-300"
        onClick={closeWindow}
        title="Close"
        type="button"
      >
        <svg
          aria-hidden="true"
          height="12"
          role="img"
          viewBox="0 0 12 12"
          width="12"
        >
          <polygon
            fill="currentColor"
            fillRule="evenodd"
            points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1 11 10.424 5.417 6 1 1.576 1 1.576 1 6 5.417 10.424 1"
          />
        </svg>
      </button>
    </div>
  );
}
