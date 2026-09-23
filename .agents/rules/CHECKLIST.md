# CHECKLIST.md — 发布前自检表 / Pre-release Checklist

> 本清单覆盖**阶段三 · 验收**末尾。AI 提交 PR 前必逐项过一遍，并在 PR 描述里贴完成情况。

---

## A. 自动化门禁 / Automated Gates

AI 在请求人 review 之前必须跑完，全绿才能进入 B：

```bash
npm run check     # Biome lint + format
npm run test      # Vitest 单元测试
npm run package   # Electron Forge 打包（写 out/）
```

- [ ] `npm run check` 全绿
- [ ] `npm run test` 全绿（含新写的测试）
- [ ] `npm run package` 成功（`out/` 有产物）

---

## B. 代码自检 / Code Self-review

- [ ] 没有遗留的 `console.log` / `debugger` / `alert`
- [ ] 没有未使用的 import / 变量 / dead code
- [ ] 新增 IPC handler / 工具函数有对应单测
- [ ] 新增的 `src/components/ui/` 不存在（应走 `npm run bump-ui` 或不引入 shadcn 组件）
- [ ] `src/localization/locales/*.json` 五种语言都有新增键
- [ ] 没有 hardcode 的英文文案（除非专有名词）
- [ ] 没有 hardcode 的颜色 / 像素（走 Tailwind 变量 / 类）
- [ ] `routeTree.gen.ts` 未手工编辑
- [ ] `forge.config.ts` Fuses 配置未动
- [ ] 没有 `forwardRef` / `dangerouslySetInnerHTML` / `eval` / barrel 文件
- [ ] commit message 走 Conventional Commits
- [ ] 没有 secrets（token / key / 邮箱密码）

---

## C. UX 自检 / UX Self-review（AI 走一遍）

适用：任何改动涉及 UI / 交互 / 渲染层。

- [ ] 首屏渲染正确（dev 模式启动，肉眼可见）
- [ ] 暗 / 亮主题切换正常，无对比度问题
- [ ] i18n 切换：至少切换到 `zh-CN` / `en` 走一遍（其他语言人不查）
- [ ] 错误态：错误信息人类可读 + 提供恢复路径（不只 `console.error`）
- [ ] 加载态：异步操作有 spinner / skeleton / disabled，不出现"按了没反应"
- [ ] 空态：列表为空有合理占位（不只空白）
- [ ] 键盘可达：Tab 顺序合理，焦点环可见
- [ ] 焦点陷阱：弹窗打开 trap focus，Esc 关闭
- [ ] 表单：label 关联 + 错误提示靠近字段 + 必填标记
- [ ] 动画：尊重 `prefers-reduced-motion`（开发者工具里勾上验证）
- [ ] 外链：带 `rel="noopener"` + 可视化提示"新窗口"

---

## D. 可访问性 / Accessibility（A 11 Y）

加载 `accessibility-testing` skill 走一遍：

- [ ] 所有 `img` 有 `alt`（装饰性可 `alt=""`）
- [ ] 所有按钮 / 链接有可读文本（无 icon-only 无 label）
- [ ] heading 层级正确（h1 → h2 → h3，不跳级）
- [ ] 颜色对比度 ≥ WCAG AA（4.5:1 正文 / 3:1 大字）
- [ ] 焦点环不被 `outline-none` 一刀切
- [ ] 屏幕阅读器走查（VoiceOver / NVDA，至少走一遍主要 flow）

---

## E. 性能 / Performance

加载 `performance-optimization` / `performance-budget` skill：

- [ ] 大依赖走动态 import（> 100KB）
- [ ] 列表 > 50 项用 virtualization
- [ ] 图片：懒加载 + 设宽高
- [ ] 无瀑布请求（并行而非串行 await）
- [ ] React Compiler 友好：避免 `forwardRef` / 不必要的 memo
- [ ] bundle 体积：变更前后对比（`vite build --report` 或 `du -sh out/`）

---

## F. 文档自检 / Docs Self-review

- [ ] `AGENTS.md` 反映了当前仓库状态（架构、命令、坑）
- [ ] `README.md` 描述与实际一致（命令、安装、特性）
- [ ] 新功能 / API 改动同步到 `docs/content/electron-shadcn/docs/`
- [ ] `STATE.md` 更新（本轮做了什么、待办、决策）
- [ ] 关键架构决策 → 写 ADR 到 `docs/adr/`

---

## G. 跨平台验收 / Cross-platform（仅重大版本）

仅当 release 性质改动（升 Electron 主体版本 / 改 build 配置）才走：

- [ ] **Windows**：本地或 CI 跑 `npm run package` 出 `.exe`，安装并启动
- [ ] **macOS**：本地跑 `npm run package` 出 `.dmg` 或 `.zip`，启动
- [ ] **Linux**：CI 出 `.deb` / `.rpm`，安装并启动

CI 在 `.github/workflows/testing.yaml` 已经做基础的 Windows / Linux 构建与 e2e，但**人为启动验证**仍是必须的（CI 只能验证"能起来"，验证不了"用起来对不对"）。

---

## H. 发布 / Release（仅当走 `npm run publish`）

加载 `git-workflow-and-versioning` skill：

- [ ] 决定版本号（semver：patch / minor / major）
- [ ] 写 changelog（`docs/content/electron-shadcn/docs/changelog.mdx` 或根目录 `CHANGELOG.md`）
- [ ] 提交 tag：`v<semver>`
- [ ] `npm run publish` 在本地或 CI 触发 GitHub draft release
- [ ] GitHub 上**手动**审阅 draft（forge 默认 draft=true）
- [ ] 审阅通过 → publish → 用户收到自动更新提示

---

## I. 紧急修复 / Hotfix 自检（轻量版）

跳过阶段一，但仍要走：

- [ ] A：lint + test + package 过
- [ ] B：仅核查与本次修复相关的项
- [ ] C / D：UX 至少走一遍受影响 flow
- [ ] H：直接 publish（版本号 patch++）
- [ ] 事后补一个 PR 写明根因 + 修复 + 教训（即使合了也要追溯）

---

## 自检结果回填 / Fill-back

AI 在 PR 描述里用以下格式回贴：

```markdown
## 自检结果 / Self-check

### 自动化门禁
- [x] check / [ ] test / [x] package

### 代码自检
- [x] console.log 清理
- [x] 新 IPC handler 单测
...

### UX 自检
- [x] 暗 / 亮主题
- [x] i18n: zh-CN, en 已走
- [ ] 其他语言（需人验收）

### 软指南违反（如有）+ 理由
- 用了内联颜色：`bg-[#abc123]`，因为...

### 门 1 / 2 / 3 通过
- 门 1 spec: docs/specs/2026-09-23-foo.md
- 门 2 见自动化门禁
- 门 3: npm run start 已跑，关键 flow 已走
```

人收到 PR 后走 C / D / E 三栏，确认门 4。

---

## 工具与技能 / Tools & Skills

| 自检栏 | skill |
|---|---|
| A | （shell） |
| B | `verification-before-completion` / `code-review-and-quality` / `code-simplification` |
| C / D | `.agents/skills/web-design-guidelines` / `accessibility-testing` / `form-validation` |
| D | `accessibility-testing` / `aria-labels` / `aria-live-regions` |
| E | `performance-optimization` / `performance-budget` / `.agents/skills/vercel-react-best-practices` |
| F | `documentation-and-adrs` |
| G | `ci-cd-and-automation` |
| H | `git-workflow-and-versioning` / `finishing-a-development-branch` |