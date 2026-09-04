# 星枢 ASTRION V1.9.9

一个整合项目、知识、自动化和工作状态的个人数字空间。星枢在 Windows 本机连接 Codex、Git、本地项目、任务、测试、TAPD、Jenkins 和 Apifox，帮助你回答：今天完成了什么、现在正在做什么、哪里需要处理，以及哪些经验可以再次复用。

## 立即下载

- [下载安装版（推荐）](https://github.com/kange666/ai-personal-workbench-download/releases/download/V1.9.9/AI-Personal-Workbench-V1.9.9-Installer.exe)
- [下载便携版](https://github.com/kange666/ai-personal-workbench-download/releases/download/V1.9.9/AI-Personal-Workbench-V1.9.9-Portable.exe)
- [查看 V1.9.9 Release 与 SHA-256](https://github.com/kange666/ai-personal-workbench-download/releases/tag/V1.9.9)
- [打开完整下载页](https://kange666.github.io/ai-personal-workbench-download/)
- [查看源代码](https://github.com/kange666/ai-personal-workbench)

V1.9.9 完善小窗口与大字号布局，修复 TAPD、知识库、测试报告和视频中心的长文本容纳；增加隔离桌面审查模式，避免样式验收影响真实数据。

## 核心工作流

1. **采集真实证据**：只读扫描 Codex 会话、Git 提交、项目目录、测试、报告和工时记录。
2. **统一项目身份**：把改名或迁移后的目录、Codex 对话、Git 仓库和 TAPD 项目归入同一个规范项目。
3. **从状态直接行动**：启动项目、处理缺陷、运行测试、查看差异、提交代码或触发 Jenkins 发布。
4. **人工确认并复用**：高风险操作由人确认，完成结果进入日历、报告和知识库。

## 主要功能

- 工作台、右侧工作状态栏、数据驾驶舱和屏保模式。
- 快速记录、待处理收件箱、每日/每周/项目任务、日历、甘特和黄历。
- 工作记录、日/周/月报告、Token 分析、通用 Codex 剩余额度、估算工时和知识库。
- 项目扫描、分类、置顶、隐藏恢复、项目身份映射、一键后台启动与停止、打开 VS Code；工作区干净时可从列表切换本地分支。
- Git 状态、差异、分支、历史、暂存、拉取、合并、回退、提交和推送；AI 只根据已暂存差异生成中文提交建议。
- 测试中心按项目保存静态、接口和浏览器证据，支持截图以及 PDF/Markdown 报告。
- 接口文档中心管理多个 Apifox 项目，支持项目下拉切换、树形检索、代码复制和请求预览。
- 发布中心选择 Jenkins 项目与已配置分支，查看队列、构建进度和结果通知。
- TAPD 支持多个项目，只同步指定负责人名下的缺陷；自动规则、队列和执行按项目隔离，人工确认后才回写已解决。
- 可选的内容工坊与视频中心，用于跟踪选题、脚本、配音、封面、成片和发布资料。
- 中英翻译支持短语命名格式复制，报错翻译提供中文含义、可能原因与排查建议，不自动执行操作。
- 设置支持主题、菜单顺序和显隐、八种托盘额度风格、邮件提醒、外部服务及本地备份；发现新版本时设置入口显示提示。

## 本地优先与安全边界

- 工作数据默认保存在 Windows 本机 SQLite，不要求部署服务端。
- Codex 和 Git 扫描默认只读，不修改原始会话或自动执行 Git 操作。
- TAPD、Git、邮箱和 API 密钥使用 Windows Credential Manager，不写入 SQLite、日志或仓库。
- 提交、推送、缺陷回写和真实接口测试需要人工确认。
- 工时明确标记为估算值并允许手工修正。
- 一键更新前自动备份本地数据库；内部备份自动只保留最近 10 条可用记录。

安装版和便携版读取同一份本机应用数据。当前尚未购买商业代码签名证书，Windows SmartScreen 可能显示“未知发布者”，请仅从本仓库或正式下载页获取文件并核对 SHA-256。
