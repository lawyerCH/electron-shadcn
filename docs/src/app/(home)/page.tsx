import type { Metadata } from "next";
import PixelBlast from "@/components/pixel-blast";
import Reveal from "@/components/reveal";
import { projects } from "@/constants";
import { HeaderText } from "./components/header-text";
import { LinksSection } from "./components/links-section";
import ProjectDocCard from "./components/project-doc-card";

export const metadata: Metadata = {
  title: "electron-shadcn docs",
  description: "Documentation for electron-shadcn — Electron Forge + Vite + React 19 + shadcn/ui template.",
};

export default function HomePage() {
  return (
    <div className="relative size-full flex-1 overflow-clip border-border p-4 md:border">
      <div className="flex flex-col items-center gap-4">
        <HeaderText />
        <div className="flex w-full flex-col gap-2 lg:grid lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectDocCard index={index} key={project.name} {...project} />
          ))}
        </div>
      </div>
      <LinksSection />
      <Reveal className="absolute inset-0 -z-10 size-full" delayMs={3000}>
        <PixelBlast
          colors={["--electron"]}
          edgeFade={0}
          enableRipples={false}
          liquid={false}
          patternDensity={1}
          patternScale={2}
          pixelSize={6}
          pixelSizeJitter={0}
          speed={0.3}
          variant="square"
        />
      </Reveal>
    </div>
  );
}
