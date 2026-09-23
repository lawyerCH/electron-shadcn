import { RootProvider } from "fumadocs-ui/provider/next";
import { mountRoute } from "@/lib/utils/route";

export default function Layout({ children }: LayoutProps<"/electron-shadcn">) {
  return (
    <RootProvider
      search={{
        options: {
          api: mountRoute("/electron-shadcn", "/api/search"),
        },
      }}
      theme={{
        enabled: true,
        forcedTheme: "dark",
        defaultTheme: "dark",
      }}
    >
      {children}
    </RootProvider>
  );
}
