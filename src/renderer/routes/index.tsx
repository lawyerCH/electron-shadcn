/**
 * Home page — entry point showcasing the template.
 *
 * Layout:
 *   - Hero: title, subtitle, CTA buttons, tech-stack icons, theme/lang toggles
 *   - Component preview: cards that render shadcn components inline (Buttons, Badges, Alert)
 *   - Features grid: 6 cards describing what the template ships with
 *   - CTA: deep link to /components for the full showcase
 *   - Footer: build credit + repo link
 */
import { SiElectron, SiReact, SiVite } from "@icons-pack/react-simple-icons";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CircuitBoard, Cpu, Layers, Palette, Rocket, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAppVersion } from "@/renderer/actions/app";
import ExternalLink from "@/renderer/components/ExternalLink";
import LangToggle from "@/renderer/components/LangToggle";
import ToggleTheme from "@/renderer/components/ToggleTheme";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/renderer/components/ui/alert";
import { Badge } from "@/renderer/components/ui/badge";
import { Button } from "@/renderer/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/renderer/components/ui/card";
import { Separator } from "@/renderer/components/ui/separator";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="transition-colors hover:border-foreground/20">
      <CardHeader>
        <div className="flex items-center gap-2 text-primary">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

function HomePage() {
  const [appVersion, setAppVersion] = useState("0.0.0");
  const { t } = useTranslation();

  useEffect(() => {
    let active = true;
    getAppVersion()
      .then((version: string) => {
        if (active) {
          setAppVersion(version);
        }
      })
      .catch(() => {
        // IPC bridge not ready (race during dev startup) — keep the
        // default "0.0.0" rather than throwing into the React tree.
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-20 px-6 py-12">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 pt-12 text-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <SiElectron size={32} />
          <SiVite size={32} />
          <SiReact size={32} />
        </div>
        <div className="space-y-4">
          <Badge className="px-3 py-1" variant="outline">
            v{appVersion} · {t("homeTemplateBadge")}
          </Badge>
          <h1 className="font-bold text-5xl tracking-tight md:text-6xl">
            {t("homeTitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
            {t("homeSubtitle")}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/components">
              {t("openShowcase")} <Rocket />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <ExternalLink href="https://github.com/lawyerch/electron-shadcn">
              {t("viewOnGithub")}
            </ExternalLink>
          </Button>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <LangToggle />
          <span aria-hidden="true">·</span>
          <ToggleTheme />
        </div>
      </section>

      <Separator />

      {/* Component preview (inline shadcn components) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-semibold text-2xl">{t("homePreviewTitle")}</h2>
          <p className="text-muted-foreground">{t("homePreviewSubtitle")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("homePreviewButtons")}</CardTitle>
              <CardDescription>{t("homePreviewButtonsDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("homePreviewBadges")}</CardTitle>
              <CardDescription>{t("homePreviewBadgesDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Error</Badge>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("homePreviewAlert")}</CardTitle>
              <CardDescription>{t("homePreviewAlertDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Zap className="h-4 w-4" />
                <AlertTitle>{t("homePreviewAlertTitle")}</AlertTitle>
                <AlertDescription>{t("homePreviewAlertBody")}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Features grid */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-semibold text-2xl">{t("homeFeaturesTitle")}</h2>
          <p className="text-muted-foreground">{t("homeFeaturesSubtitle")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            description={t("homeFeatureForgeDesc")}
            icon={<CircuitBoard className="h-5 w-5" />}
            title="Electron Forge"
          />
          <FeatureCard
            description={t("homeFeatureViteDesc")}
            icon={<Zap className="h-5 w-5" />}
            title="Vite + HMR"
          />
          <FeatureCard
            description={t("homeFeatureRouterDesc")}
            icon={<Layers className="h-5 w-5" />}
            title="TanStack Router"
          />
          <FeatureCard
            description={t("homeFeatureShadcnDesc")}
            icon={<Palette className="h-5 w-5" />}
            title="shadcn/ui + Tailwind 4"
          />
          <FeatureCard
            description={t("homeFeatureOrpcDesc")}
            icon={<Cpu className="h-5 w-5" />}
            title="oRPC IPC"
          />
          <FeatureCard
            description={t("homeFeatureShippedDesc")}
            icon={<Rocket className="h-5 w-5" />}
            title={t("homeFeatureShippedTitle")}
          />
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section>
        <Card className="border-dashed bg-muted/30">
          <CardHeader className="items-center gap-2 text-center">
            <CardTitle className="text-2xl">{t("homeCtaTitle")}</CardTitle>
            <CardDescription>{t("homeCtaSubtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button asChild size="lg">
              <Link to="/components">
                {t("openShowcase")} <Rocket />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-center gap-3 border-t pt-8 text-muted-foreground text-sm">
        <span>{t("homeFooter")}</span>
        <ExternalLink href="https://github.com/lawyerch/electron-shadcn">
          GitHub
        </ExternalLink>
        <span aria-hidden="true">·</span>
        <span>MIT</span>
      </footer>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
