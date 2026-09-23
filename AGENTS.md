# AGENTS.md — electron-shadcn

Electron Forge + Vite + React 19 + TypeScript 桌面应用模板。渲染层使用 shadcn/ui（Radix UI + Tailwind 4）、TanStack Router（基于文件路由）、i18next；IPC 使用 **基于 `MessagePort` 的 oRPC**，**不是**常见的 `ipcRenderer.invoke`。自动更新通过 `update-electron-app` 接入 GitHub Releases。

## 安装与日常命令

```bash
npm install
npm run start      # Electron Forge 开发模式（main + preload + Vite 渲染层，端口 :5174）
npm run check      # ultracite（Biome）lint+格式 检查
npm run fix        # ultracite 自动修复
npm run test       # vitest run（单元测试，jsdom）
npm run test:watch # vitest watch
npm run test:e2e   # Playwright；需要先构建应用，详见下方"E2E"
npm run test:all   # unit + e2e
npm run package    # electron-forge package → out/
npm run make       # electron-forge make（生成安装包）
npm run publish    # electron-forge publish（创建 GitHub draft release，需 GITHUB_TOKEN）
npm run bump-ui    # 重新执行 `shadcn add -y -o` 更新 src/components/ui 中的全部组件
```

要求 Node 20+。CI 中 `check` 用 Node 24，`test:e2e` 和 `publish` 用 Node 20。

## 架构 —— 三个进程，IPC 通过 MessagePort

- `src/main.ts` —— Electron 主进程。创建 `BrowserWindow`（自定义标题栏：`hidden` / `hiddenInset`），接入 `updateElectronApp`，并在 `app.whenReady` 时调用 `setupORPC()`，将 oRPC handler 注册到 `IPC_CHANNELS.START_ORPC_SERVER`。
- `src/preload.ts` —— 极简：仅把渲染层发来的 `START_ORPC_SERVER` message-port 转发给 `ipcMain`。完整的桥接逻辑放在渲染层，以便 React 拿到类型化的 oRPC 客户端。
- `src/renderer.ts` → `src/app.tsx` —— 渲染层入口。`app.tsx` 挂载 `<RouterProvider>`，并在 effect 中调用 `syncWithLocalTheme()` + `updateAppLanguage(i18n)`。

IPC 契约（渲染层侧，`src/ipc/manager.ts`）：
1. 渲染层创建一个 `MessageChannel`，通过 `window.postMessage(IPC_CHANNELS.START_ORPC_SERVER, "*", [port2])` 把 `port2` 投递给自己。
2. Preload 把这个 port 转发到同一通道的 `ipcMain`。
3. 主进程调用 `rpcHandler.upgrade(serverPort)`，两端共享一个 oRPC `RPCLink`。

新增 IPC 流程：在 `src/ipc/<area>/handlers.ts` 写 oRPC handler，再写一个 `index.ts` 导出一个对象。`src/ipc/router.ts` 里的 router 是手写的字面量对象（`{ app, shell, theme, window }`），**不是**自动生成的。渲染层通过 `@/ipc/manager` 调用类型化客户端（`ipc.client.<area>.<proc>`），封装 hook 放在 `src/actions/*.ts`。

## 仓库目录

```
src/
  main.ts, preload.ts, renderer.ts, app.tsx      # Electron 入口
  routes/                                        # TanStack Router 文件路由
    __root.tsx, index.tsx, second.tsx            # second.tsx 是示例页，新项目可删除
  routeTree.gen.ts                               # 由 @tanstack/router-plugin 自动生成，**禁止手工编辑**
  ipc/                                           # 主进程 oRPC handlers
    handler.ts, router.ts, manager.ts, context.ts
    <area>/{handlers.ts, index.ts}               # app、shell、theme、window
  actions/                                       # 渲染层对 ipc.client.* 的封装
  components/
    ui/                                          # shadcn 组件 —— Biome 中忽略，用 bump-ui 重新生成
    drag-window-region.tsx, lang-toggle.tsx, toggle-theme.tsx, ...
  constants/index.ts                             # LOCAL_STORAGE_KEYS、IPC_CHANNELS、inDevelopment
  localization/                                  # i18next 配置（en、pt-BR）
  styles/global.css                              # Tailwind 4 入口 + CSS 变量（oklch）
  tests/unit/                                    # vitest，jsdom，setup.ts 加载 @testing-library/jest-dom
  tests/e2e/                                     # playwright，使用 electron-playwright-helpers
  utils/{devtools,path,routes,tailwind}.ts
forge.config.ts                                  # Electron Forge + VitePlugin + FusesPlugin + GitHub publisher
vite.main.config.mts                             # 主进程打包
vite.preload.config.mts                          # preload + codeSplittingFlagPlugin（见 Vite 注意点）
vite.renderer.config.mts                         # tanstackRouter + tailwindcss + reactCompilerPreset（React Compiler）
biome.jsonc                                      # extends ultracite/biome/core + react
```

## 路径别名 `@/*` → `./src/*`

在**四个**配置里都设置了：`tsconfig.json`、`vite.main.config.mts`、`vite.renderer.config.mts`、`vitest.config.ts`。新增工具时务必注册到这里 —— TypeScript 自身不会让 Vite 在运行时识别别名。

## Vite / 构建注意点（容易踩坑）

- 渲染层开发服务器固定在 **5174 端口**（`strictPort: false`，端口被占时静默回退，不会大声报错）。
- `vite.preload.config.mts` 内置了一个内联插件 `codeSplittingFlagPlugin`，把已弃用的 `inlineDynamicImports` 迁移为 Rolldown 的 `codeSplitting: false`。`@electron-forge/plugin-vite` 仍会输出旧 key —— **不要移除这个插件**，否则会出 Rolldown 警告甚至构建失败。
- 渲染层 `resolve.preserveSymlinks: true`。
- React Compiler 通过 `@rolldown/plugin-babel` + `reactCompilerPreset()` 启用。组件必须对编译器友好（不要 `forwardRef`，不需要手动 `useMemo` 等）。
- `forge.config.ts` 配置了 Fuses（`OnlyLoadAppFromAsar`、`EmbeddedAsarIntegrityValidation`、Cookie 加密、关闭 `RunAsNode`、关闭 Node CLI inspect）。生产构建中**不要**关闭这些。

## 路由（TanStack Router）

- 文件路由在 `src/routes/`。新增 `foo.tsx` 后 `routeTree.gen.ts` 会在 `npm run start` 时重新生成。
- Router 使用 `createMemoryHistory` —— 没有 URL 栏，别指望深链路由"开箱即用"。
- `src/routeTree.gen.ts` 入库（未被 gitignore），但**绝对不要手工编辑** —— Biome 已忽略它，CI 也可能重新生成。

## 样式

- Tailwind 4 通过 `@tailwindcss/vite` 接入（没有 `tailwind.config.js`，配置全部写在 `src/styles/global.css` 的 `@theme` / CSS 变量中）。
- shadcn 组件位于 `src/components/ui/`，被 Biome 忽略（`biome.jsonc` 中 `!**/ui`），可以放心 `bump-ui` 而不会引入格式噪音。
- Geist 字体（variable + mono）通过 `@fontsource-variable/geist` 引入到 `global.css`。

## Lint（Ultracite / Biome）

- Biome extends `ultracite/biome/core` + `ultracite/biome/react`。**先跑 `npm run fix` 再跑 `npm run check`** —— 大多数问题会自动修复。
- 忽略：`node_modules`、`*.d.ts`、`src/components/ui/**`、`src/routeTree.gen.ts`。
- Globals：`MAIN_WINDOW_VITE_DEV_SERVER_URL`、`MAIN_WINDOW_VITE_NAME`（Electron Forge 注入）。
- 完整编码约定见 `.github/copilot-instructions.md`（applyTo `*.{ts,tsx,js,jsx}`）—— 大改动前先读一遍。要点：不使用 `forwardRef`（React 19+）、避免 barrel 文件、语义化 HTML、可访问性标签、禁止 `dangerouslySetInnerHTML`、外链带 `rel="noopener"`。

## 测试

**单元测试（Vitest）** —— 配置：`vitest.config.ts`。JSDOM 环境，启用 globals，`src/tests/unit/setup.ts` 加载 `@testing-library/jest-dom`。运行单文件：`npx vitest run src/tests/unit/foo.test.tsx`。监听模式：`npm run test:watch`。覆盖率（v8，html+json+text）已配置但**没有**写到脚本里 —— 需要时显式执行 `npx vitest run --coverage`。

**E2E（Playwright）** —— `playwright.config.ts` 只用 Chromium。测试在 `src/tests/e2e/`，**必须先构建 Electron 应用**：`electron-playwright-helpers` 的 `findLatestBuild()` 读 `out/`。严格顺序：
1. `npm run package`（写入 `out/`）
2. `npm run test:e2e`

CI 通过 `xvfb-run --auto-servernum --server-args="-screen 0 1280x960x24"` 跑（本地 Linux runner 也需要显示器）。启动模式参考 `src/tests/e2e/example.test.ts`。

## 发布

- `npm run publish` 通过 `@electron-forge/publisher-github` 创建 **draft** GitHub release，发布前务必在 GitHub 上审阅。
- 自动更新指向 `lawyerch/electron-shadcn`，使用 Electron Public Update Service。**如果 fork**，记得改 `src/main.ts`（`checkForUpdates`）的 `repo` 与 `forge.config.ts` 的 publisher `repository.owner/name`。
- `.github/workflows/publish.yaml` 仅 `workflow_dispatch` 触发且运行在 `windows-latest` —— 推送 tag 不会自动发布。

## 容易踩的坑

- **不要编辑 `routeTree.gen.ts`** —— 重启 `npm run start` 即可重新生成。
- **不要移除** `vite.preload.config.mts` 中的 `codeSplittingFlagPlugin`。
- **不要随意改动 `nodeIntegration`** —— context isolation 是有意为之（见 `src/main.ts`）。
- 这个仓库本身是个 *template* —— `src/routes/second.tsx` 是示例，新应用通常会删掉它（并重新生成 `routeTree.gen.ts`）。
- 本地 agent 目录（`.agents/`、`.claude/`）已在 `.gitignore` 中，**不要提交**。`.claude/skills/*` 是指向 `.agents/skills/*` 的符号链接，避免重复维护。
- `forge.config.ts` 打包输出在 `out/`（gitignore）。注意区分 `dist/`（TypeScript 输出）和 `.vite/build/`（Vite 中间产物）。

## 配套文档 / Companion Docs

本文件（`AGENTS.md`）是机器合约。流程与规范的完整内容在 `.agents/rules/` 子目录：

- `.agents/rules/WORKFLOW.md` —— 三阶四门流程、Git 流程、跨会话连续性、技能路由
- `.agents/rules/STYLE.md` —— 代码 / UI / i18n / 测试 风格规范（硬规则 / 软指南分区）
- `.agents/rules/CHECKLIST.md` —— 阶段三 · 验收 末尾的自检清单（按 A-I 分类）

AI 工作流：

```
开 session → 读 AGENTS.md + .agents/rules/WORKFLOW.md 顶部 + .agents/rules/STATE.md
  ↓
阶段一 → 写 spec / 走 brainstorming
  ↓
阶段二 → 实现前必读 .agents/rules/STYLE.md 硬规则段；完工前过 .agents/rules/CHECKLIST.md A + B
  ↓
阶段三 → 走 .agents/rules/CHECKLIST.md 全栏，回填自检结果给人 review
```

`.agents/rules/STATE.md`（人在上次 session 末尾更新）记录：进行中任务 / 决策 / 待办 / 已知坑。