const fallbackRelease = "https://github.com/kange666/ai-personal-workbench-download/releases";

function shortHash(value = "") {
  return value ? `${value.slice(0, 12)}…${value.slice(-8)}` : "暂未提供";
}

function displayVersion(value = "") {
  return value ? `V${value.replace(/^[vV]/, "")}` : "版本未知";
}

function setReleaseStatus(content, link) {
  const status = document.querySelector("#releaseStatus");
  status.replaceChildren(document.createTextNode(content));
  if (!link) return;
  status.append(" · ");
  const anchor = document.createElement("a");
  anchor.href = link.href;
  anchor.target = "_blank";
  anchor.rel = "noreferrer";
  anchor.textContent = link.label;
  status.append(anchor);
}

async function loadRelease() {
  try {
    const response = await fetch(`release.json?time=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const release = await response.json();
    const versionLabel = displayVersion(release.version);
    document.querySelectorAll(".release-version").forEach((node) => { node.textContent = versionLabel; });
    document.querySelector("#heroVersion").textContent = versionLabel;
    document.querySelector("#installerSize").textContent = release.installer?.sizeText || "未知";
    document.querySelector("#portableSize").textContent = release.portable?.sizeText || "未知";

    const installerHash = document.querySelector("#installerHash");
    const portableHash = document.querySelector("#portableHash");
    installerHash.textContent = shortHash(release.installer?.sha256);
    portableHash.textContent = shortHash(release.portable?.sha256);
    installerHash.dataset.full = release.installer?.sha256 || "";
    portableHash.dataset.full = release.portable?.sha256 || "";

    document.querySelector("#installerDownload").href = release.installer?.url || fallbackRelease;
    document.querySelector("#portableDownload").href = release.portable?.url || fallbackRelease;
    document.querySelector("#heroDownload").href = release.installer?.url || "#download";
    document.querySelector("#releaseNotes").textContent = release.notes || "持续完善本地开发工作流与稳定性。";

    const published = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(new Date(release.publishedAt));
    document.querySelector("#publishedDate").textContent = `${published} 发布 · Windows 10 / 11 · x64`;
    setReleaseStatus(`最新稳定版 ${versionLabel} 已就绪`, { href: release.releaseUrl || fallbackRelease, label: "查看 Release 与完整校验信息 ↗" });
  } catch {
    document.querySelector("#releaseNotes").textContent = "版本信息暂时读取失败，可前往 GitHub Releases 获取最新版本。";
    setReleaseStatus("无法读取在线版本信息", { href: fallbackRelease, label: "打开 GitHub Releases ↗" });
  }
}

const themeToggle = document.querySelector("#themeToggle");

function applyTheme(theme, persist = false) {
  const warm = theme === "warm";
  document.documentElement.dataset.theme = warm ? "warm" : "command";
  themeToggle.setAttribute("aria-pressed", String(warm));
  themeToggle.querySelector("span").textContent = warm ? "深色" : "暖色";
  document.querySelector('meta[name="theme-color"]').content = warm ? "#f1eee6" : "#090c12";
  if (persist) localStorage.setItem("astrion-download-theme", warm ? "warm" : "command");
}

applyTheme(localStorage.getItem("astrion-download-theme") === "warm" ? "warm" : "command");
themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "warm" ? "command" : "warm", true);
});

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const input = document.createElement("textarea");
  input.value = value;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

document.querySelectorAll(".copy-hash").forEach((button) => button.addEventListener("click", async () => {
  const target = document.querySelector(`#${button.dataset.copy}`);
  const value = target.dataset.full || target.textContent;
  try {
    await copyText(value);
    button.textContent = "已复制";
  } catch {
    button.textContent = "复制失败";
  }
  window.setTimeout(() => { button.textContent = "复制"; }, 1400);
}));

loadRelease();
