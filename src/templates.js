import { mkdtemp, rm, readdir, stat, readFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { Readable } from "node:stream";
import { extract } from "tar";

const TARBALL_BASE_URL =
  "https://api.github.com/repos/joaofmartinho/praxis-veritas/tarball";

const MAX_DOWNLOAD_SIZE = 10 * 1024 * 1024; // 10 MB

export async function fetchTemplates({ ref = "main" } = {}) {
  const url = `${TARBALL_BASE_URL}/${encodeURIComponent(ref)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "praxis-veritas-cli" },
    redirect: "follow",
  });

  if (!res.ok) {
    const hint = res.status === 403 ? " You may be rate-limited." : "";
    throw new Error(`GitHub API returned status ${res.status}.${hint}`);
  }

  const contentLength = Number(res.headers.get("content-length"));
  if (contentLength > MAX_DOWNLOAD_SIZE) {
    throw new Error(
      `Response too large (${contentLength} bytes). Maximum is ${MAX_DOWNLOAD_SIZE} bytes.`
    );
  }

  const buffer = Buffer.from(await res.arrayBuffer());

  if (buffer.length > MAX_DOWNLOAD_SIZE) {
    throw new Error(
      `Downloaded content too large (${buffer.length} bytes). Maximum is ${MAX_DOWNLOAD_SIZE} bytes.`
    );
  }

  const tmpDir = await mkdtemp(join(tmpdir(), "praxis-veritas-"));

  try {
    const stream = Readable.from(buffer);
    const extractor = extract({
      cwd: tmpDir,
      strip: 1,
      filter: (path) => {
        const parts = path.split("/").slice(1);
        const relative = parts.join("/");
        return (
          relative.startsWith("praxis/") ||
          relative === "praxis" ||
          relative.startsWith(".ai-workflow/") ||
          relative === ".ai-workflow"
        );
      },
    });

    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.pipe(extractor);
      extractor.on("end", resolve);
      extractor.on("error", reject);
    });

    const files = new Map();
    await collectFilesIfExists(join(tmpDir, "praxis"), "praxis", files);
    await collectFilesIfExists(join(tmpDir, ".ai-workflow"), ".ai-workflow", files);
    return files;
  } finally {
    await rm(tmpDir, { recursive: true, force: true });
  }
}

async function collectFilesIfExists(dir, prefix, files) {
  try {
    await stat(dir);
  } catch (err) {
    if (err.code === "ENOENT") return;
    throw err;
  }

  await collectFiles(dir, prefix, files);
}

async function collectFiles(dir, prefix, files) {
  const entries = await readdir(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const relativePath = `${prefix}/${entry}`;
    const s = await stat(fullPath);
    if (s.isDirectory()) {
      await collectFiles(fullPath, relativePath, files);
    } else {
      const content = await readFile(fullPath, "utf-8");
      files.set(relativePath, content);
    }
  }
}
