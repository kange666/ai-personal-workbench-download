const fallbackRelease = "https://github.com/kange666/ai-personal-workbench-download/releases";

function shortHash(value = "") {
  return value ? `${value.slice(0, 12)}…${value.slice(-8)}` : "暂未提供";
}

function displayVersion(value = "") {
  return value ? `V${value.replace(/^[vV]/, "")}` : "版本未知";
}

async function loadRelease() {
  const status = document.querySelector("#releaseStatus");
  try {
    const response = await fetch(`release.json?time=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const release = await response.json();
    const versionLabel = displayVersion(release.version);
    document.querySelectorAll(".release-version").forEach((node) => { node.textContent = versionLabel; });
    document.querySelector("#heroVersion").textContent = versionLabel;
    document.querySelector("#installerSize").textContent = release.installer.sizeText;
    document.querySelector("#portableSize").textContent = release.portable.sizeText;
    const installerHash = document.querySelector("#installerHash");
    const portableHash = document.querySelector("#portableHash");
    installerHash.textContent = shortHash(release.installer.sha256);
    portableHash.textContent = shortHash(release.portable.sha256);
    installerHash.dataset.full = release.installer.sha256;
    portableHash.dataset.full = release.portable.sha256;
    document.querySelector("#installerDownload").href = release.installer.url;
    document.querySelector("#portableDownload").href = release.portable.url;
    document.querySelector("#heroDownload").href = release.installer.url;
    const published = new Intl.DateTimeFormat("zh-CN", { dateStyle: "long" }).format(new Date(release.publishedAt));
    status.innerHTML = `最新版本 <b>${versionLabel}</b> · 发布于 ${published} · <a href="${release.releaseUrl}">查看 Release 与校验文件 ↗</a>`;
  } catch {
    status.innerHTML = `版本信息暂时读取失败，请前往 <a href="${fallbackRelease}">GitHub Releases ↗</a>`;
  }
}

document.querySelector("#themeToggle").addEventListener("click", (event) => {
  const warm = document.documentElement.dataset.theme !== "warm";
  document.documentElement.dataset.theme = warm ? "warm" : "command";
  event.currentTarget.textContent = warm ? "B 深色" : "C 暖色";
});

document.querySelectorAll(".copy-hash").forEach((button) => button.addEventListener("click", async () => {
  const target = document.querySelector(`#${button.dataset.copy}`);
  await navigator.clipboard.writeText(target.dataset.full || target.textContent);
  button.textContent = "已复制";
  setTimeout(() => { button.textContent = "复制"; }, 1200);
}));

const dialog = document.querySelector("#imageDialog");
document.querySelectorAll(".screen-card").forEach((card) => card.addEventListener("click", () => {
  document.querySelector("#dialogImage").src = card.dataset.image;
  document.querySelector("#dialogImage").alt = card.dataset.alt;
  dialog.showModal();
}));
document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

loadRelease();
