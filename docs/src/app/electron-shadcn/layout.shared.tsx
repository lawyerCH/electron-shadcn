import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { HomeIcon } from "lucide-react";
import { DocLayoutTitle } from "@/components/doc-layout-title";

export function baseLayoutProps(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <DocLayoutTitle
          className="text-electron"
          description="electron-shadcn"
          title="ES"
        />
      ),
      url: "/electron-shadcn/docs",
    },
    themeSwitch: {
      enabled: false,
    },
    githubUrl: "https://github.com/LuanRoger/electron-shadcn",
    links: [
      {
        icon: <HomeIcon />,
        text: "Home",
        url: "/",
        secondary: false,
      },
    ],
  };
}
