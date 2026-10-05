# WaveWise plugins for Claude and Codex

[中文](#中文) · [English](#english)

## 中文

这个仓库把 WaveWise Merchant 接入 AI 应用：Claude Code、Cowork，以及 OpenAI 的 Codex 与 ChatGPT。

一个插件同时带两份清单，它们指向同一个远程 MCP 服务：`https://mcp.wavewiseintelligence.com/mcp`。插件包含：

- MCP 连接：只有地址，不带任何凭据。首次使用时，你会在 WaveWise 登录，并在授权页上决定给哪些权限。
- 五个 skill：
  - `geo-visibility-review`：解读 AI 可见度测量，结论不超过证据所能支持的程度。
  - `geo-mission-to-page-change`：从任务到页面改动，再到复测。复测前一定先展示报价。
  - `brand-truth-grounded-copy`：只用品牌方已确认的事实写内容；缺少的事实转成提议，不编造。
  - `creator-campaign-planning`：读营销计划和候选达人，起草寻源简报，确认预览后提交计划；不联系达人，不花额度。
  - `weekly-growth-review`：汇总本周的日程、任务、合作复盘和外联状态，形成建议，由人在 WaveWise 里做决定。

  后两个 skill 需要工作区开通了 growth 工具集，并授予 `growth.read`（提交计划和记录时还需要 `growth.propose`）。

### 安装

- **Claude Code**：`/plugin marketplace add WaveWise-Lab/wavewise-agent-plugins`，然后 `/plugin install wavewise@wavewise`。
- **Codex**：本仓库在 `.agents/plugins/marketplace.json` 提供仓库级插件市场；插件本体在 `plugins/wavewise`。

AI 应用能做的事不会超出你在工作区里的角色。会产生费用或需要 Admin 批准的操作，仍然要由人在 WaveWise 里完成。你可以随时在「我的账号 → AI 应用」里断开连接。完整说明见 <https://wavewiseintelligence.com/ai-apps>。

### 目录结构

```
.claude-plugin/marketplace.json       Claude Code 插件市场
.agents/plugins/marketplace.json      Codex 仓库级插件市场
plugins/wavewise/
  .claude-plugin/plugin.json          Claude 清单
  .codex-plugin/plugin.json           Codex / ChatGPT 清单
  .mcp.json                           远程 MCP 服务（两边共用）
  skills/<name>/SKILL.md              两边共用的 skill
scripts/check-content.mjs             检查密钥、令牌和个人信息
scripts/check-manifests.mjs           核对两份清单是否一致
```

### 维护规则

- 这里不放客户数据、真实商户名称或任何凭据。CI 用 `scripts/check-content.mjs` 拦截。
- skill 只写工作流步骤和护栏，不写让模型越权的指令。
- 两份清单的 `version` 必须相同，并跟随工具集的开放阶段。
- CI 会依次运行 `claude plugin validate`（插件与插件市场）、OpenAI Codex 的插件校验器（按 commit 和哈希锁定），以及上面两个脚本。

### 状态

- 本仓库以 Apache-2.0 许可证发布，全文见 [`LICENSE`](LICENSE)。
- 插件尚未在 Claude 和 OpenAI 的插件目录上架。

## English

This repository connects WaveWise Merchant to AI apps: Claude Code, Cowork, and OpenAI's Codex and ChatGPT.

One plugin ships two manifests that point to the same remote MCP server, `https://mcp.wavewiseintelligence.com/mcp`. The plugin contains:

- The MCP connection: an address only, with no credentials. The first time you use it, you sign in to WaveWise and choose on a consent screen what the app may do.
- Five skills:
  - `geo-visibility-review`: explains AI-visibility measurements without claiming more than the evidence supports.
  - `geo-mission-to-page-change`: takes a mission to a page change and a re-measurement, always showing the quote before re-measuring.
  - `brand-truth-grounded-copy`: writes content only from facts the brand owner has confirmed; missing facts become proposals instead of guesses.
  - `creator-campaign-planning`: reads the campaign plan and candidate creators, drafts sourcing briefs and applies a previewed plan; never contacts a creator or spends credits.
  - `weekly-growth-review`: summarises the week's schedule, tasks, collaboration reviews and outreach status into recommendations that people decide in WaveWise.

  The last two need the growth toolset enabled for the workspace and `growth.read` (plus `growth.propose` to apply plans and records).

**Install**
- **Claude Code**: `/plugin marketplace add WaveWise-Lab/wavewise-agent-plugins`, then `/plugin install wavewise@wavewise`.
- **Codex**: the repository marketplace is at `.agents/plugins/marketplace.json`, and the plugin is in `plugins/wavewise`.

An assistant can never do more than your own role in the workspace allows. Anything that costs money or needs an admin still waits for a person in WaveWise. You can disconnect at any time under Account → AI apps. Full guide: <https://wavewiseintelligence.com/ai-apps>.

**Status**
- Licensed under the Apache License 2.0; see [`LICENSE`](LICENSE).
- The plugin is not yet listed in the Claude or OpenAI plugin directories.
