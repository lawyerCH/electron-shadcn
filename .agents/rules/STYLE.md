# STYLE.md — 风格规范 / Style Guide

本文档定义 **做成什么样**。分两栏：**硬规则**（lint/门禁强制 / 不商量）+ **软指南**（默认遵循 / 有理由可破）。

AI 在阶段二开始前必读本文件；阶段三自检时回看。

---

## 1. 代码风格 / Code Style

### 硬规则（linter 强制）

- Biome 通过 `npm run check` / `npm run fix`（extends `ultracite/biome/core` + `react`）
- 忽略范围：`node_modules` / `*.d.ts` / `src/renderer/components/ui/**` / `src/routeTree.gen.ts`
- **不用 `forwardRef`**（React 19+ 直接传 ref 为 prop）
- **不用 barrel 文件**（避免 `index.ts` 聚合再导出）
- **不写 `dangerouslySetInnerHTML`**（除非绝对必要，且加 review 标记）
- 外链 `target="_blank"` 必带 `rel="noopener"`
- 不用 `var`、不用 `.forEach()` 优先 `for...of`、不用泛 `any`（统一 `unknown`）
- 命名：组件 PascalCase / hooks camelCase / 常量 UPPER_SNAKE / 事件 `handle*` / 自定义事件 `on*`
- 详见 `.github/copilot-instructions.md`

### 软指南

- 显式类型用于公开 API / 跨模块边界；内部可用推导
- 命名优先 **意图 > 实现**（`getUserById` 而不是 `queryDb`）
- 注释只解释"为什么"，不解释"做了什么"（代码即文档）
- 单文件 ≤ 300 行；超出 → 拆（信号：可能做了太多事）

---

## 2. TypeScript / React

### 硬规则

- TS strict 模式开启，`noImplicitAny: true`
- 组件用 function component，不用 class
- hooks 必须顶层调用（不写在条件/循环里）
- 列表用稳定的 `key`（不用数组下标）
- 不在组件内定义组件（每次 render 重建，违反 React Compiler 友好）

### 软指南

- 复合组件用 `composition-patterns`（avoid boolean prop proliferation）
- 服务端数据用 TanStack Query；本地状态用 `useState` / `useReducer`；跨组件用 context 或 zustand（轻量）
- 不要"过度抽象"——三处相似才抽象

### 性能（来自 `vercel-react-best-practices`）

- **消除瀑布**：并行请求 / 不要 `await` 串行
- **bundle 优化**：动态 import 大依赖；避免全量 lodash
- **re-render 优化**：state 下沉、`useMemo` / `useCallback` 仅在必要时；React Compiler 已自动 memoize 时不再手写
- 列表渲染用 virtualization（>50 项）
- 图片 lazy load + 设宽高

---

## 3. 架构 / Architecture

### 硬规则

- 三进程边界清晰：`src/main/` / `src/preload/` / `src/renderer/` 各司其职
- IPC 走 oRPC + MessagePort（不用 `ipcRenderer.invoke`），新 IPC 流程见 AGENTS.md
- 路径别名 `@/*` → `./src/*`（四个配置文件都设了，新工具要注册）
- 不动 `routeTree.gen.ts`、`forge.config.ts`、`vite.preload.config.mts` 的硬约束部分

### 软指南

- 模块边界清晰（参考 `api-and-interface-design` / `architecture-design` skills）
- 单一职责：一个文件一个明确目的
- 公共逻辑提到 `src/{main,renderer}/utils/`，业务逻辑留在原地
- IPC handler / 渲染层 actions / 业务组件 三层分明（见 `src/main/ipc/<area>/` 与 `src/renderer/actions/<area>.ts`）

---

## 4. UI 风格 / UI Style

### 硬规则（linter + 视觉）

- 全部走 shadcn/ui 组件（在 `src/components/ui/`，由 `bump-ui` 重新生成）
- Tailwind 4 通过 `@tailwindcss/vite`，无 `tailwind.config.js`，变量在 `src/styles/global.css`
- 不内联颜色，统一 CSS 变量（`--background` / `--foreground` / `--primary` 等）
- 暗色模式走 `:is(.dark *)` + `oklch()` 颜色
- Geist 字体通过 `@fontsource-variable/geist` 引入

### 软指南（来自 `web-design-guidelines`）

- **可达性**（必看）：
  - 所有交互元素有 `aria-label` / 语义化标签
  - focus-visible 可见（不要 `outline-none` 一刀切）
  - 表单：`<label>` 关联 input + `autocomplete` + 错误信息靠近字段
  - 动画尊重 `prefers-reduced-motion`
  - 键盘可操作（Tab / Enter / Esc）
- **动效**：
  - 优先 `transform` / `opacity`（compositor 友好，不触 layout）
  - 时长 100-300ms；不要超过 500ms
- **字体**：
  - 用花引号（`'` 而不是 `'`）
  - 省略号用 `…` 字符
  - 数字密集处用 `font-variant-numeric: tabular-nums`
- **图片**：
  - 必设 `width` / `height`（避免 CLS）
  - 首屏图不 lazy
  - 非装饰性图必带 `alt`
- **导航 / 状态**：
  - URL 反映状态（深链可分享）—— 本项目 memory history 例外
  - 加载中：骨架屏 / spinner；错误：错误信息 + 重试入口
- **暗色 / 主题**：
  - HTML 根节点带 `color-scheme` meta
  - 主题切换平滑过渡
- **i18n**：
  - 日期 / 数字 / 货币用 `Intl.*Format`
  - 文案不允许硬编码英文（除非专有名词 / UI 行业词）

### 组件设计（来自 `vercel-composition-patterns`）

- 避免 boolean prop 膨胀（`<Button primary secondary ghost />` → 拆 `<Button variant=>` + 子组件组合）
- 状态上提：把状态提到需要的最近共同祖先
- 内部组合：暴露 `asChild` 让消费者覆盖根元素

---

## 5. i18n

### 硬规则

- 所有用户可见字符串放 `src/localization/locales/*.json`（不内联在 `.tsx`）
- 加新语言：JSON + `langs.ts` 注册 + 同步文档
- 当前支持：`zh-CN` / `zh-TW` / `en` / `ja` / `pt-BR`

### 软指南

- 翻译键命名语义化（`titleHomePage` 而不是 `page1_title`）
- 跨语言文案长度差预留 ±30% 空间（按钮 / 标签）
- 复数 / 时态：用 i18next 的 plural / context 机制

---

## 6. 测试 / Testing

### 硬规则

- 新 IPC handler / 业务逻辑 / 工具函数 → 必加单测（Vitest）
- 测试路径：`src/tests/unit/<area>.test.ts(x)`，与 `vitest.config.ts` 的 `dir` 对齐
- 测试命名：被测函数 + 行为（`getUserById returns user when id exists`）
- **不写 placeholder 测试**（`it('works', () => {})` 一律删除）
- 不用 `.only` / `.skip`（CI 会拒）

### 软指南

- happy path + 1 边界 = 80% 价值
- React 组件测试用 `@testing-library/react`，不测实现细节（不写 CSS 类名断言）
- E2E（Playwright）只在关键 flow 上加，不要每个组件都写

---

## 7. Git 与 PR / Git & PR

### 硬规则

- commit message 走 Conventional Commits（见 WORKFLOW.md）
- commit 不带 secrets（lint 不一定能扫出，靠自觉）
- PR 描述必含：变更摘要 / 自检结果 / 涉及的软指南违反 + 理由

### 软指南

- 一个 PR 一个主题（不要混 feat + chore）
- PR 标题 ≤ 72 字符，描述段落化
- 涉及 UI 改动 → 附截图 / 录屏

---

## 软指南 / Soft Guidelines（汇总）

不在 linter 范围但默认遵守：

- **可读性 > 简洁**：愿意多写一行换可读
- **意图 > 实现**：命名 / 函数签名表达意图，不描述实现
- **复用 > 新建**：先查 `src/components/ui/` / `src/utils/`
- **明确 > 隐式**：跨模块边界必显式；内部可推导
- **小步 > 大步**：可拆的 PR 拆出来
- **同步更新文档**：改 API 改 spec，改流程改 WORKFLOW.md

---

## 新文件头注释模板 / New File Header Template

每个新文件开头写一段 JSDoc 风格的注释，说明"为什么"和"做什么"。

### 模板

```ts
/**
 * 文件目的（为什么存在）
 * - 关键职责 1
 * - 关键职责 2
 */
```

### 各场景示例

**IPC handler（main 侧）** —— `src/main/ipc/<area>/handlers.ts`：
```ts
/**
 * <area> area 的 oRPC 过程集合
 * - proc1: 做什么
 * - proc2: 做什么
 * 通过 src/renderer/ipc-manager 暴露给渲染层
 */
```

**Action 封装（renderer 侧）** —— `src/renderer/actions/<area>.ts`：
```ts
/**
 * <area> IPC 客户端封装
 * - 包装 ipc.client.<area>.* 给 React 组件用
 * - 处理 localStorage 持久化（如适用）
 */
```

**工具函数** —— `src/utils/<x>.ts`：
```ts
/**
 * <功能简述>
 * 用法: <一行示例>
 */
```

**React 组件** —— `src/renderer/components/<name>.tsx`：
```ts
/**
 * <组件作用>，被 <哪个父组件> 使用
 * - 接收 <关键 props>
 */
```

### 反模式
- 注释里**重复代码做了什么**（函数名 + 类型签名已经说明）
- 注释**超过 6 行**（说明这块做太多事，应该拆）
- 注释里**包含过时内容**（代码改了不改注释比没注释更糟）

---

## 硬规则 / Hard Rules（汇总，不商量）

- **linter / typecheck / test / build** 全部通过（门 2）
- **不改** `routeTree.gen.ts` / `forge.config.ts`（Fuses 部分） / `vite.preload.config.mts`（`codeSplittingFlagPlugin`） / `nodeIntegration`
- **不带 secrets** 入 commit
- **i18n 不漏翻译**：所有用户字符串有 JSON 条目
- **可达性硬底线**：每个交互元素可键盘可达、有可读 label
- **测试先行**：新逻辑先测试后实现（trivial 除外）
- **AI 不绕 spec 直达代码**：阶段一没过禁止阶段二