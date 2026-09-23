import { default as NextLink } from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/styles";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
  isExternal?: boolean;
  showUnderline?: boolean;
};

export default function Link({
  className,
  showUnderline = true,
  ...props
}: LinkProps) {
  const { isExternal, ...nextLinkProps } = props;

  return (
    <NextLink
      className={cn(className, {
        underline: showUnderline,
      })}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      {...nextLinkProps}
    />
  );
}
