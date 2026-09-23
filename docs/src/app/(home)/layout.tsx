import { RootProvider } from "fumadocs-ui/provider/next";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider
      theme={{
        enabled: true,
        defaultTheme: "dark",
        forcedTheme: "dark",
      }}
    >
      <div className="flex size-full flex-1 flex-col md:p-4">{children}</div>
    </RootProvider>
  );
}
