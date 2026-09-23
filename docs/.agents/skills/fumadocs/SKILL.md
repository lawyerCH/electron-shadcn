---
name: fumadocs-documentation-skill
description: Comprehensive guidance on writing documentation using Fumadocs framework and its component ecosystem
argument-hint: "Fumadocs, documentation, MDX, content organization, writing style, component usage"
---

# Fumadocs Documentation Skill

## Mission

You are the Fumadocs documentation specialist for this repository. Your responsibility is to create, maintain, and improve high-quality documentation using the Fumadocs framework and its component ecosystem.

## Overview

This skill provides comprehensive guidance on writing exceptional documentation using Fumadocs, including:

- Fumadocs conventions and best practices
- Documentation structure and organization
- Content hierarchy and navigation patterns
- Writing style guidelines
- Component usage for enhanced documentation
- Practical tips for maintainable, scalable docs

## Table of Contents

1. [Fumadocs Fundamentals](#fumadocs-fundamentals)
2. [Documentation Structure](#documentation-structure)
3. [Content Organization](#content-organization)
4. [Writing Style Guide](#writing-style-guide)
5. [Page Hierarchy & Navigation](#page-hierarchy--navigation)
6. [Fumadocs Components](#fumadocs-components)
7. [MDX Best Practices](#mdx-best-practices)
8. [Advanced Patterns](#advanced-patterns)
9. [Maintenance & Scalability](#maintenance--scalability)

---

## Fumadocs Fundamentals

### Core Principles

1. **Content-First**: Fumadocs prioritizes content clarity over visual complexity
2. **Type-Safe**: All content is type-safe through collection schemas
3. **MDX-Powered**: Combines Markdown simplicity with React component flexibility
4. **Performance-Optimized**: Built for fast loading and smooth navigation

### Project Structure

```text
LuanRoger/docs/
├── content/                    # Documentation content
│   ├── electron-shadcn/        # Project-specific docs
│   │   └── docs/              # Documentation pages
│   │       ├── getting-started/
│   │       │   ├── installation.mdx
│   │       │   ├── scriptis.mdx
│   │       │   └── ...
│   │       ├── components/
│   │       │   ├── drag-window-region.mdx
│   │       │   └── ...
│   │       └── ...
│   └── ts-package-template/    # Another project's docs
│       └── docs/
│           └── getting-started/
│               ├── introduction.mdx
│               └── ...
├── src/
│   ├── lib/
│   │   ├── sources/           # Source configurations
│   │   │   ├── electron-shadcn.ts
│   │   │   └── ts-package-template.ts
│   │   └── source.config.ts   # MDX collection definitions
│   ├── components/            # Custom components
│   └── app/                   # Next.js app structure
├── source.config.ts           # Fumadocs MDX configuration
├── AGENTS.md                 # Agent instructions
└── package.json              # Dependencies
```

### Configuration Files

#### `source.config.ts`

Defines MDX collections for each project:

```typescript
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";

export const electronShadcnDocs = defineDocs({
  dir: "content/electron-shadcn/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {},
});
```

#### Source Files

Each project has a dedicated source file:

```typescript
// src/lib/sources/electron-shadcn.ts
import { electronShadcnDocs } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";

export const source = loader({
  baseUrl: "/electron-shadcn/docs",
  source: electronShadcnDocs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});
```

---

## Documentation Structure

### Recommended Structure

Follow this hierarchical structure for each project:

```text
docs/
├── getting-started/          # Onboarding and setup
│   ├── introduction.mdx      # Project overview
│   ├── installation.mdx      # Setup instructions
│   ├── configuration.mdx     # Configuration guide
│   └── quick-start.mdx        # Fast setup
├── guides/                   # Tutorials and how-tos
│   ├── best-practices.mdx
│   ├── troubleshooting.mdx
│   └── migration.mdx
├── components/              # Component documentation
│   ├── component-a.mdx
│   └── component-b.mdx
├── api/                      # API reference
│   ├── endpoints.mdx
│   └── types.mdx
├── architecture/             # System design
│   ├── overview.mdx
│   └── diagrams.mdx
├── customization/            # Theming and styling
│   ├── theming.mdx
│   ├── icons.mdx
│   └── updating-components.mdx
├── deployment/               # Deployment guides
│   ├── ci-cd.mdx
│   ├── docker.mdx
│   └── publish.mdx
├── testing/                  # Testing documentation
│   └── testing.mdx
├── internationalization/     # i18n guides
│   └── internationalization.mdx
└── building/                 # Build processes
    └── building.mdx
```

### File Naming Conventions

- Use **kebab-case** for file names: `getting-started.mdx`, not `GettingStarted.mdx`
- Use **singular** for single topics: `configuration.mdx`, not `configurations.mdx`
- Use **plural** for collections: `components/`, `guides/`
- Prefix with numbers for ordered sequences: `01-installation.mdx`, `02-setup.mdx`
- Avoid special characters and spaces

### Frontmatter Standards

Every MDX file must include proper frontmatter:

```mdx
---
title: Installation
description: Get started with electron-shadcn in minutes
---
```

Required fields:
- `title`: Page title (used in navigation and SEO)
- `description`: Brief summary (used in meta tags and previews)

Optional fields:
- `icon`: Icon identifier for navigation
- `hidden`: Boolean to exclude from navigation
- `order`: Custom sorting order

---

## Content Organization

### Page Types

#### 1. Overview Pages
- Provide high-level project introduction
- Explain the "what" and "why"
- Include feature lists and use cases
- Link to detailed guides

#### 2. Tutorial Pages
- Step-by-step instructions
- Beginner-friendly language
- Practical examples
- Clear outcomes

#### 3. Reference Pages
- API documentation
- Configuration options
- Technical specifications
- Structured data

#### 4. Concept Pages
- Explain architectural decisions
- Describe patterns and principles
- Provide context and reasoning
- Help users understand the "why"

### Content Grouping

Group related content using:

1. **Directory structure**: Physical grouping in filesystem
2. **Navigation categories**: Logical grouping in sidebar
3. **Cross-references**: Internal links between related pages

Example grouping for electron-shadcn:
```text
getting-started/    # New users
├── installation.mdx
├── scriptis.mdx
└── ...

customization/     # Advanced users
├── theming.mdx
├── icons.mdx
└── updating-components.mdx

components/        # Component reference
├── drag-window-region.mdx
├── external-link.mdx
└── language-toggle.mdx
```

---

## Writing Style Guide

### Language Guidelines

1. **Tone**: Professional yet approachable
2. **Voice**: Active voice preferred
3. **Person**: Second person ("you") or third person
4. **Tense**: Present tense for current features, future tense for upcoming features

### Formatting Rules

#### Headings
- Use **sentence case** for headings: "Install dependencies", not "Install Dependencies"
- **H1**: Page title (from frontmatter)
- **H2**: Major sections
- **H3**: Subsections
- **H4**: Detailed topics
- Avoid skipping heading levels

#### Code Formatting

```mdx
// Good: Language specified, proper formatting
```typescript
const config = {
  name: 'my-app',
  version: '1.0.0',
};
```

// Bad: Missing language, poor formatting
```
const config = {name: 'my-app', version: '1.0.0'}
```
```

#### Lists
- Use hyphens for unordered lists
- Use numbers for ordered lists
- Add blank line before and after lists
- Indent nested lists with 2 spaces

#### Links
- Use descriptive link text: "Read the [installation guide](#installation)", not "Click [here](#installation)"
- Prefer relative links for internal content
- Use absolute URLs for external resources

### Content Quality Checklist

- [ ] Clear and concise language
- [ ] Accurate technical information
- [ ] Working code examples
- [ ] Proper heading hierarchy
- [ ] Consistent terminology
- [ ] No typos or grammatical errors
- [ ] All links are valid
- [ ] Images have alt text
- [ ] Code is properly formatted

---

## Page Hierarchy & Navigation

### Navigation Structure

Fumadocs uses a tree-based navigation system. Pages are automatically organized based on:

1. **Directory structure**: Filesystem hierarchy
2. **Frontmatter**: Custom ordering and grouping
3. **Configuration**: Source loader settings

### Navigation Best Practices

1. **Depth**: Limit to 3-4 levels deep
2. **Ordering**: Use `order` field in frontmatter for custom sorting
3. **Grouping**: Use directories to group related pages
4. **Labels**: Use clear, descriptive titles

### Example Navigation Tree

```
electron-shadcn
├── Getting Started
│   ├── Introduction
│   ├── Installation
│   └── Quick Start
├── Customization
│   ├── Theming
│   ├── Icons
│   └── Components
├── Components
│   ├── Drag Window Region
│   ├── External Link
│   └── Language Toggle
└── Advanced
    ├── IPC Communication
    ├── Testing
    └── CI/CD
```

### URL Structure

- Follow directory structure: `/electron-shadcn/docs/getting-started/installation`
- Use kebab-case for slugs
- Avoid special characters
- Keep URLs short and descriptive

---

## Fumadocs Components

### Overview

Fumadocs provides a rich set of components to enhance documentation pages. All components are imported from `fumadocs-ui/components/*`.

### Available Components

#### Layout Components
- **DocsLayout**: Main documentation layout
- **DocsPage**: Individual page layout
- **NotebookLayout**: Notebook-style layout

#### Content Components

##### Callout
Display important information, tips, warnings, or notes.

```mdx
import { Callout } from "fumadocs-ui/components/callout";

<Callout type="info">
  This is an informational message.
</Callout>

<Callout type="warning">
  This is a warning message.
</Callout>

<Callout type="danger">
  This is a critical message.
</Callout>

<Callout type="check">
  This is a success message.
</Callout>
```

**Types**: `info`, `warning`, `danger`, `check`, `default`

**Props**:
- `type`: Message type (required)
- `title`: Optional title
- `icon`: Custom icon
- `children`: Content

**Usage Recommendations**:
- Use Callouts sparingly for truly important information that needs visual emphasis
- Reserve for warnings, critical notes, and key insights
- Avoid using Callouts for regular explanatory text or feature lists
- Consider converting to regular paragraphs or bullet points when appropriate
- Types should match content importance: `warning` for limitations, `info` for helpful tips, `danger` for critical issues

##### Tabs
Organize content into tabbed sections.

```mdx
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

<Tabs items={['npm', 'yarn', 'pnpm']}>
  <Tab value="npm">
    ```bash
    npm install
    ```
  </Tab>
  <Tab value="yarn">
    ```bash
    yarn install
    ```
  </Tab>
  <Tab value="pnpm">
    ```bash
    pnpm install
    ```
  </Tab>
</Tabs>
```

**Props**:
- `items`: Array of tab labels (required)
- `defaultIndex`: Default active tab index
- `groupId`: Share state across tabs
- `persist`: Persist selection in localStorage
- `updateAnchor`: Update URL hash on change

##### Steps
Create step-by-step guides.

```mdx
import { Step, Steps } from "fumadocs-ui/components/steps";

<Steps>
  <Step>
    ### Clone the Repository
    
    ```bash
    git clone https://github.com/user/repo.git
    ```
  </Step>
  <Step>
    ### Install Dependencies
    
    ```bash
    npm install
    ```
  </Step>
  <Step>
    ### Start Development Server
    
    ```bash
    npm run dev
    ```
  </Step>
</Steps>
```

**Props**:
- `children`: Step elements

##### Accordion
Create collapsible sections for FAQs or detailed information.

```mdx
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";

<Accordions type="single">
  <Accordion title="What is Fumadocs?">
    Fumadocs is a documentation framework built on Next.js and MDX.
  </Accordion>
  <Accordion title="How do I get started?">
    Run `npx create-fumadocs` to create a new project.
  </Accordion>
</Accordions>
```

**Props**:
- `type`: `single` (one open at a time) or `multiple` (multiple open)
- `title`: Accordion title (required)
- `id`: Unique identifier for linking
- `disabled`: Disable interaction
- `defaultOpen`: Open by default

##### Files
Display file structure visually.

```mdx
import { File, Folder, Files } from "fumadocs-ui/components/files";

<Files>
  <Folder name="src" defaultOpen>
    <File name="index.ts" />
    <File name="config.ts" />
    <Folder name="components">
      <File name="button.tsx" />
    </Folder>
  </Folder>
  <File name="package.json" />
</Files>
```

**Props**:
- `name`: File or folder name (required)
- `defaultOpen`: Open folder by default
- `disabled`: Disable interaction
- `icon`: Custom icon

##### TypeTable
Document type definitions and props.

```mdx
import { TypeTable } from "fumadocs-ui/components/type-table";

<TypeTable
  type={{
    name: {
      description: 'The name of the component',
      type: 'string',
      required: true,
    },
    age: {
      description: 'The age in years',
      type: 'number',
      default: 0,
    },
    active: {
      description: 'Whether the component is active',
      type: 'boolean',
      default: false,
    },
  }}
/>
```

**Object Type Props**:
- `description`: Field description
- `type`: Type annotation
- `typeDescription`: Additional type info
- `default`: Default value
- `required`: Is field required
- `deprecated`: Is field deprecated
- `parameters`: Function parameters
- `returns`: Function return type

##### InlineTOC
Add table of contents within page content.

```mdx
import { InlineTOC } from "fumadocs-ui/components/inline-toc";

<InlineTOC items={toc}>Table of Contents</InlineTOC>
```

**Props**:
- `items`: Table of contents data
- `defaultOpen`: Open by default
- `disabled`: Disable interaction

##### Banner
Display site-wide announcements.

```mdx
import { Banner } from "fumadocs-ui/components/banner";

<Banner variant="rainbow">
  New version 2.0 released! Check out the migration guide.
</Banner>
```

**Props**:
- `variant`: `default` or `rainbow`
- `id`: Unique identifier for persistence
- `changeLayout`: Adjust layout spacing
- `rainbowColors`: Custom rainbow colors

##### GitHubInfo
Display GitHub repository information.

```mdx
import { GithubInfo } from "fumadocs-ui/components/github-info";

<GithubInfo owner="LuanRoger" repo="electron-shadcn" />
```

**Props**:
- `owner`: Repository owner (required)
- `repo`: Repository name (required)
- `token`: GitHub access token (optional)

##### AutoTypeTable
Auto-generate type tables from TypeScript types.

```mdx
import { AutoTypeTable } from "fumadocs-ui/components/auto-type-table";

<AutoTypeTable identifier="MyComponentProps" />
```

##### ImageZoom
Allow users to zoom into images.

```mdx
import { ImageZoom } from "fumadocs-ui/components/image-zoom";

<ImageZoom src="/path/to/image.png" alt="Description" />
```

##### GraphView
Display a graph of all documentation pages.

```mdx
import { GraphView } from "fumadocs-ui/components/graph-view";

<GraphView source={source} />
```

### Component Usage Patterns

#### 1. Import Once, Use Many

```mdx
import { Callout, Tab, Tabs, Step, Steps } from "fumadocs-ui/components";

<Callout type="info">Tip</Callout>

<Tabs items={['A', 'B']}>
  <Tab value="A">Content A</Tab>
  <Tab value="B">Content B</Tab>
</Tabs>
```

#### 2. Group Related Components

```mdx
// Good: Related components grouped
import { File, Folder, Files } from "fumadocs-ui/components/files";

// Bad: Mixed imports
import { File } from "fumadocs-ui/components/files";
import { Folder } from "fumadocs-ui/components/files";
```

#### 3. Use TypeScript for Props

```mdx
import type { TypeTableProps } from "fumadocs-ui/components/type-table";

const props: TypeTableProps['type'] = {
  name: { type: 'string', description: 'The name' },
};
```

---

## MDX Best Practices

### Frontmatter

Always include frontmatter with at least title and description:

```mdx
---
title: Component Documentation
description: Learn how to use our components effectively
---
```

### Imports

1. **Group imports** by source
2. **Order imports**: React, external, internal, components
3. **Use named imports** for clarity

```mdx
// Good
import { Callout } from "fumadocs-ui/components/callout";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { MyComponent } from "@/components/my-component";

// Bad
import { Callout } from "fumadocs-ui/components/callout";
import { MyComponent } from "@/components/my-component";
import { Step } from "fumadocs-ui/components/steps";
```

### Component Usage

1. **Self-closing tags** for void components
2. **Proper indentation** for nested components
3. **Props on separate lines** for readability

```mdx
// Good
<Callout type="info">
  This is a helpful tip.
</Callout>

<Tabs items={['Option 1', 'Option 2']} defaultIndex={0}>
  <Tab value="Option 1">
    Content for option 1
  </Tab>
  <Tab value="Option 2">
    Content for option 2
  </Tab>
</Tabs>

// Bad
<Callout type="info">This is a helpful tip.</Callout>
<Tabs items={['Option 1', 'Option 2']} defaultIndex={0}>
<Tab value="Option 1">Content for option 1</Tab>
<Tab value="Option 2">Content for option 2</Tab>
</Tabs>
```

### Code Blocks

1. **Always specify language**
2. **Use proper formatting**
3. **Keep examples concise**
4. **Include comments** when helpful

```mdx
// Good
```typescript
// Initialize the configuration
const config = {
  name: 'my-app',
  version: '1.0.0',
  // Enable all features
  features: {
    darkMode: true,
    search: true,
  },
};
```

// Bad
```
const config = {name: 'my-app', version: '1.0.0', features: {darkMode: true, search: true}};
```
```

### Links

1. **Use relative paths** for internal links
2. **Use descriptive text**
3. **Test all links**

```mdx
// Good
[Get started with installation](./installation.mdx)
[Learn more about components](#components)

// Bad
[Click here](./installation.mdx)
[Here](#components)
```

### Images

1. **Use relative paths**
2. **Always include alt text**
3. **Optimize image sizes**

```mdx
// Good
![Project architecture diagram](./images/architecture.png "Project architecture")

// Bad
![image](./images/architecture.png)
```

---

## Advanced Patterns

### Conditional Content

Use JavaScript expressions in MDX:

```mdx
{process.env.NODE_ENV === 'development' && (
  <Callout type="warning">
    This content only appears in development.
  </Callout>
)}
```

### Dynamic Imports

Load components dynamically:

```mdx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(
  () => import('fumadocs-ui/components/codeblock'),
  { ssr: false }
);
```

### Custom Components

Create reusable custom components:

```mdx
// components/mdx.tsx
import { Callout } from "fumadocs-ui/components/callout";

export function InfoBox({ children }: { children: React.ReactNode }) {
  return <Callout type="info">{children}</Callout>;
}

// In MDX
import { InfoBox } from "@/components/mdx";

<InfoBox>
  This is a custom info box.
</InfoBox>
```

### Component Composition

Combine components for complex layouts:

```mdx
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Step, Steps } from "fumadocs-ui/components/steps";

<Tabs items={['Beginner', 'Advanced']}>
  <Tab value="Beginner">
    <Steps>
      <Step>
        ### Step 1
        Basic content
      </Step>
    </Steps>
  </Tab>
  <Tab value="Advanced">
    <Steps>
      <Step>
        ### Step 1
        Advanced content
      </Step>
    </Steps>
  </Tab>
</Tabs>
```

---

## Maintenance & Scalability

### Documentation Lifecycle

1. **Creation**: Write initial documentation
2. **Review**: Peer review for accuracy
3. **Testing**: Verify all examples work
4. **Publication**: Merge and deploy
5. **Maintenance**: Update as code changes

### Versioning

1. **Keep documentation in sync** with code versions
2. **Document breaking changes** prominently
3. **Maintain version compatibility** matrices

### Cross-References

1. **Link between related pages**
2. **Use consistent anchor IDs**
3. **Update references** when moving content

```mdx
// Good: Consistent anchor
## Installation {#installation}

// Good: Reference with anchor
[See installation steps](#installation)

// Bad: Inconsistent
## Installation

[See above](#installation)
```

### Search Optimization

1. **Use descriptive titles**
2. **Include keywords** in descriptions
3. **Structure content** with proper headings
4. **Use semantic HTML**

### Performance Tips

1. **Lazy load** heavy components
2. **Optimize images**
3. **Minimize external dependencies**
4. **Use static generation** where possible

### Testing Documentation

1. **Verify all code examples** compile and run
2. **Test all links** are valid
3. **Check rendering** on different devices
4. **Validate MDX syntax**

### Update Strategy

When code changes:
1. **Identify affected documentation**
2. **Update examples** to match new API
3. **Add migration notes** for breaking changes
4. **Update screenshots** if UI changes
5. **Verify all references** are still valid

---

## Quick Reference

### Common Import Patterns

```typescript
// Single component
import { Callout } from "fumadocs-ui/components/callout";

// Multiple components from same module
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

// All components from a module
import * as TabsComponents from "fumadocs-ui/components/tabs";
```

### Component Cheat Sheet

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| Callout | Info boxes | type, title, icon |
| Tabs | Tabbed content | items, defaultIndex, groupId, persist |
| Steps | Step-by-step guides | - |
| Accordion | Collapsible sections | type, title, id, defaultOpen |
| Files | File structure | name, defaultOpen, disabled |
| TypeTable | Type documentation | type |
| CodeBlock | Code display | language, title, icon |
| InlineTOC | Table of contents | items, defaultOpen |
| Banner | Site announcements | variant, id, changeLayout |
| GitHubInfo | Repo info | owner, repo, token |

### Fumadocs CLI Commands

```bash
# Add a component to your project
npx @fumadocs/cli@latest add tabs
npx @fumadocs/cli@latest add steps
npx @fumadocs/cli@latest add accordion
npx @fumadocs/cli@latest add files
npx @fumadocs/cli@latest add type-table
npx @fumadocs/cli@latest add codeblock
npx @fumadocs/cli@latest add banner
npx @fumadocs/cli@latest add github-info
```

---

## Resources

- [Fumadocs Documentation](https://fumadocs.dev)
- [Fumadocs UI Components](https://fumadocs.dev/docs/ui/components)
- [Fumadocs MDX](https://fumadocs.dev/docs/mdx)
- [Fumadocs GitHub](https://github.com/fuma-nama/fumadocs)

---

## Checklist for New Documentation

- [ ] Proper frontmatter with title and description
- [ ] Correct file location based on content type
- [ ] Appropriate heading hierarchy
- [ ] All code examples are tested and working
- [ ] All links are valid
- [ ] Images have alt text
- [ ] Consistent terminology with existing docs
- [ ] Proper component usage
- [ ] Mobile-friendly layout
- [ ] SEO-optimized content

---

## Success Criteria

A well-written Fumadocs documentation page should:

1. **Be easy to understand** for the target audience
2. **Provide accurate information** that matches the code
3. **Include working examples** that users can copy-paste
4. **Have clear navigation** to related content
5. **Be visually appealing** with proper component usage
6. **Load quickly** with optimized assets
7. **Be maintainable** with consistent structure
8. **Be discoverable** through search and navigation

---

*Last updated: {new Date().toISOString()}*
