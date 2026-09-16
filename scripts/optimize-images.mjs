import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const sourceRoot = path.resolve("assets/images/source");
const outputRoot = path.resolve("public/images");
const supportedExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".tif", ".tiff", ".webp"]);
const maxWidth = 2400;

async function listImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listImages(filePath);
    return supportedExtensions.has(path.extname(entry.name).toLowerCase()) ? [filePath] : [];
  }));
  return files.flat();
}

async function optimize(sourcePath) {
  const relativePath = path.relative(sourceRoot, sourcePath);
  const targetDirectory = path.join(outputRoot, path.dirname(relativePath));
  const baseName = path.basename(relativePath, path.extname(relativePath));
  await mkdir(targetDirectory, { recursive: true });
  const pipeline = sharp(sourcePath, { animated: false }).rotate().resize({ width: maxWidth, withoutEnlargement: true });
  await Promise.all([
    pipeline.clone().webp({ quality: 88, smartSubsample: true }).toFile(path.join(targetDirectory, `${baseName}.webp`)),
    pipeline.clone().avif({ quality: 68, effort: 5 }).toFile(path.join(targetDirectory, `${baseName}.avif`)),
  ]);
  return relativePath;
}

try {
  const files = await listImages(sourceRoot);
  if (!files.length) {
    console.log("No source images found in assets/images/source.");
    process.exit(0);
  }
  const optimized = await Promise.all(files.map(optimize));
  console.log(`Optimized ${optimized.length} image(s):\n${optimized.map((file) => `- ${file}`).join("\n")}`);
} catch (error) {
  if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") console.error("Create assets/images/source before running the image pipeline.");
  else console.error(error);
  process.exit(1);
}
