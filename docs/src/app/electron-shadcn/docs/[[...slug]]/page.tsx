import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AiContentWarning from "@/components/ai-content-warning";
import { getPageImage, source } from "@/lib/sources/electron-shadcn";
import { mountGitHubEditUrl } from "@/lib/utils/url";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(
  props: PageProps<"/electron-shadcn/docs/[[...slug]]">
) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="m-0">{page.data.description}</DocsDescription>
      <AiContentWarning />
      <ViewOptionsPopover
        className="self-start"
        githubUrl={mountGitHubEditUrl("/electron-shadcn", page.path)}
      />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/electron-shadcn/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
