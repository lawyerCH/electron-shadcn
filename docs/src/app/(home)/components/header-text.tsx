import HighlightedText from "@/components/highlighted-text";
import { SlideUpText } from "@/components/slide-up-text";

export function HeaderText() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <HighlightedText className="text-5xl" delay={0.5}>
        docs.
      </HighlightedText>
      <SlideUpText
        className="font-mono text-muted-foreground text-sm"
        delay={1}
      >
        Documentation of Luan Roger's open-source projects.
      </SlideUpText>
    </div>
  );
}
