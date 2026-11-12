import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, sep } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "out");
const entries = ["index.html", "index.txt", "_next", "fonts", "Ahmed_Badr_Shaaban.pdf", "favicon.svg"];

if (!existsSync(join(output, "index.html"))) {
  throw new Error("Build output is missing. Run npm run build first.");
}

for (const entry of entries) {
  const source = resolve(output, entry);
  const target = resolve(root, entry);
  if (!source.startsWith(output + sep) || !target.startsWith(root + sep)) {
    throw new Error(`Unsafe publish path: ${entry}`);
  }
  if (!existsSync(source)) continue;
  await rm(target, { recursive: true, force: true });
  await mkdir(dirname(target), { recursive: true });
  await cp(source, target, { recursive: true });
}

await writeFile(join(root, ".nojekyll"), "");
console.log("Portfolio prepared at the repository root for branch-based GitHub Pages.");
