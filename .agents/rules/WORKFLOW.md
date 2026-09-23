# WORKFLOW.md — 开发工作流 / Development Workflow

本仓库为 AI 全流程开发：你（人）只在末轮做 UX 签收；AI 负责 spec / 实现 / 自验证。本文档定义 **什么时候做什么**。

---

## 角色 / Roles

| 角色 | 职责 |
|---|---|
| **AI Agent** | spec 撰写、代码、TDD、自验证（lint / test / build）、提交、给 review |
| **Human** | 需求决策、UX 走场与签收、发布授权、紧急裁决 |
| **不在场** | 设计 / 工程权衡由 AI 自决，但须在 PR 描述里写明理由（违反"软指南"时必写） |

---

## 三阶四门 / Three Phases, Four Gates

```
阶段一 · 需求澄清   → 门 1: spec 经人 review
阶段二 · 实现       → 门 2: lint+test+build 过 → 门 3: dev 可跑
阶段三 · 验收       → 门 4: 人签收 → 合入
```

### 阶段一 · 需求澄清 / Phase 1 — Requirements

**触发**：任何非平凡任务（平凡改动如改名/小修可以跳到阶段二并在 PR 描述里写一行 spec）。

**动作**：
1. 加载 `brainstorming` skill，把含糊需求拆成可验证的成功标准
2. 大任务 → 写 spec 到 `docs/specs/YYYY-MM-DD-<topic>.md`，套用 `writing-skills` 模板
3. 小任务 → spec-in-chat（在本会话里写一段，AI 回读后开始干）
4. 涉及跨模块/跨进程决策 → 加载 `architecture-design`；涉及 IPC / API 契约 → 加载 `api-and-interface-design`
5. 关键决策（不可逆、影响架构）→ 用 `documentation-and-adrs` 写 ADR 到 `docs/adr/`

**门 1 通过条件**：
- spec 内含：目标 / 验收标准 / 不做什么 / 风险
- 人回复"通过"或提问，AI 已回答

### 阶段二 · 实现 / Phase 2 — Implementation

**动作**：
1. 大特性 → 加载 `using-git-worktrees` 隔离；常规改动直接在当前分支
2. 测试先行 → 加载 `tdd`（test-driven-development）skill
3. UI 改动 → 加载 `.agents/skills/ui-styling` 或 `.agents/skills/web-design-guidelines` 作为参考
4. 性能敏感改动 → 加载 `.agents/skills/vercel-react-best-practices`
5. 组件设计 → 加载 `.agents/skills/vercel-composition-patterns`
6. 大任务 / 多文件 / 可并行 → 加载 `subagent-driven-development` 或 `dispatching-parallel-agents`
7. 修 bug → 加载 `systematic-debugging`（先复现再定位再修）
8. 完工前 → 加载 `verification-before-completion` 自检

**门 2 通过条件**（全部满足）：
- `npm run check`（Biome lint + format）过
- `npm run test`（单元）过
- `npm run package`（Electron Forge 打包）过

**门 3 通过条件**：
- `npm run start` 起得来
- 改动涉及的页面 / 交互 / 错误态可手动走查（AI 在 PR 描述里贴自检清单）

### 阶段三 · 验收 / Phase 3 — Acceptance

**动作**：
1. AI 列变更摘要（before/after diff、变更文件清单、自检结果）
2. AI 加载 `requesting-code-review` skill，规范化 review 请求
3. 人收到 review 请求 → 跑软件、走 UX flow、查错误态、查样式一致性
4. 人回复"通过"或提反馈 → 反馈回来时 AI 加载 `receiving-code-review`，**事实核验后再实现**（不盲目接受）

**门 4 通过条件**：
- 人书面签收（"LGTM" / "通过" / "ship it"）
- 反馈清单已处理或显式拒绝（带理由）

**合入**：加载 `finishing-a-development-branch` 选择合并策略（默认 squash merge 到 main）。

---

## Git 流程 / Git Flow

### 分支

| 类型 | 命名 | 用途 |
|---|---|---|
| 特性 | `feat/<topic>` | 新功能 |
| 修复 | `fix/<topic>` | 普通 bug |
| 杂项 | `chore/<topic>` | 依赖、配置、文档 |
| 紧急 | `hotfix/<topic>` | 跳过阶段一的紧急修复 |

main 分支受保护（`forge.config.ts` + CI）。

### Commit

- 遵循 [Conventional Commits](https://www.conventionalcommits.org/)：`feat:` / `fix:` / `chore:` / `docs:` / `refactor:` / `test:` / `style:` / `perf:`
- 一个 commit = 一个自洽单元（build 不会坏）
- 阶段一末单独 commit spec；阶段二每完成一个有意义子步骤 commit；阶段三末不重复 commit
- **不带 secrets**（硬规则 —— lint 不一定能扫出，靠自觉 + pre-commit hook）

### 提交时机（硬规则）

- [ ] 阶段一：spec 文件可独立提交
- [ ] 阶段二：每完成一个测试/实现/重构循环即可 commit（小步）
- [ ] 阶段三：仅在合入时 squash，不重复 commit

### 紧急修复 / Hotfix

跳过阶段一（但 chat 里至少写一行 `Fix: <症状>`），仍须过门 2 / 3 / 4。

---

## 跨会话连续性 / Cross-session Continuity

AI 没有持久记忆，**每次新会话靠文档接力**。

### 开 session 第一件事

1. 读 `AGENTS.md`（机器合约）
2. 读 `CLAUDE.md`（如存在）
3. 读 `STATE.md`（人在上一次会话末尾更新，记录：进行中任务 / 决策 / 待办 / 已知坑）
4. `git log --oneline -20` 看最近上下文
5. 如有 `docs/specs/*.md` 进行中的 spec → 读

### 收 session 最后一件事

AI 在 commit 末尾追加更新 `STATE.md`：
- 当前任务进度（done / doing / todo）
- 关键决策（ADR 引用）
- 已知坑 / TODO / FIXME
- 下次会话第一行建议

### 软指南

- 把 spec / ADR 写进 `docs/`，AGENTS.md 只做指针（不重复内容）
- STATE.md 长度 ≤ 200 行；超出 → 把细节移到 spec / ADR
- 跨会话不要重新解释已沉淀在文档里的内容

---

## 工具与技能路由 / Skills Routing

| 阶段 | 必加载 | 按需加载 |
|---|---|---|
| 阶段一 | `brainstorming` | `architecture-design` / `api-and-interface-design` / `documentation-and-adrs` / `writing-skills` |
| 阶段二 | `tdd` / `verification-before-completion` | `using-git-worktrees` / `subagent-driven-development` / `dispatching-parallel-agents` / `systematic-debugging` / `.agents/skills/vercel-react-best-practices` / `.agents/skills/vercel-composition-patterns` / `.agents/skills/web-design-guidelines` / `.agents/skills/ui-styling` / `.agents/skills/shadcn` / `.agents/skills/migrate-radix-to-base` |
| 阶段三 | `requesting-code-review` / `receiving-code-review` / `finishing-a-development-branch` | `git-workflow-and-versioning` / `documentation-and-adrs` |

**新会话第一动作**：加载 `using-superpowers` skill，触发元规则检查。

---

## 硬规则 / Hard Rules（不商量）

1. **四门全过才合入**：门 1 → 门 2 → 门 3 → 门 4，按顺序
2. **不带 secrets**：token / key / 邮箱密码不进 commit
3. **spec 必经人 review**：阶段一不过，禁止进入阶段二
4. **修改前先读再改**：尤其 `routeTree.gen.ts`、`forge.config.ts`、`vite.preload.config.mts`（AGENTS.md 已标注）
5. **不改 `nodeIntegration` / Fuses**：AGENTS.md 标注的硬约束
6. **测试先行**：阶段二任何新逻辑，先写测试再写实现（除非 trivial）
7. **变更结束前回放 verify**：`verification-before-completion` skill 自检

## 软指南 / Soft Guidelines（默认这样做，有理由可破）

1. 偏好 **小步 commit**（一个 commit 一个原子变更）
2. 偏好 **inline 实现**（除非任务大到需要 subagent）
3. 偏好 **测试覆盖 happy path + 1-2 边界**（不全覆盖，重在行为契约）
4. 偏好 **复用已有 utilities**（`src/utils/`、`@/components/ui/`）
5. 偏好 **遵循现有命名 / 目录约定**（读 `AGENTS.md` 仓库目录那节）
6. 偏好 **写明"为什么"**（违反软指南 / 软规则的 PR 必在描述里写理由）
7. 偏好 **跨会话留痕**（STATE.md / spec / ADR）