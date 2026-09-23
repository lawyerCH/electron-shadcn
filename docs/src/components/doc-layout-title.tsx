import { cn } from "@/lib/utils/styles";

type DocLayoutTitleProps = {
  title: string;
  description: string;
  className?: string;
};

export function DocLayoutTitle({
  title,
  description,
  className,
}: DocLayoutTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className={cn("font-pixel text-3xl", className)}>{title}</h1>
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  );
}
