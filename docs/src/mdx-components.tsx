import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
// biome-ignore lint/performance/noNamespaceImport: Need to import all components
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock keepBackground {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    ...components,
  };
}
