import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/styles";

type FeatureItem = {
  title: string;
  description: ReactNode;
  icon: ReactNode;
};

type FeatureCardsProps = {
  features: FeatureItem[];
  colorClassName?: string;
};

export default function FeatureCards({
  features,
  colorClassName,
}: FeatureCardsProps) {
  const cardsClassNames = cn("h-full flex-1", colorClassName || "bg-card/50");

  return (
    <div className="grid grid-cols-1 items-center justify-center gap-5 p-4 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => {
        const { title, description, icon } = feature;

        return (
          <Card className={cardsClassNames} key={`feature-card-${title}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {icon} {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
