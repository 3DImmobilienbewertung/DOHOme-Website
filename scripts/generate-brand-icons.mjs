import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const svgPath = path.join(root, "app", "icon.svg");
const svg = await fs.readFile(svgPath);

async function png(size, output) {
  await sharp(svg).resize(size, size).png().toFile(path.join(root, output));
}

await Promise.all([
  png(180, "public/apple-touch-icon.png"),
  png(192, "public/web-app-icon-192.png"),
  png(512, "public/web-app-icon-512.png"),
]);

// ICO container with an embedded 64×64 PNG. This covers browsers that still
// request /favicon.ico directly instead of using the SVG icon metadata.
const faviconPng = await sharp(svg).resize(64, 64).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

const directory = Buffer.alloc(16);
directory.writeUInt8(64, 0);
directory.writeUInt8(64, 1);
directory.writeUInt8(0, 2);
directory.writeUInt8(0, 3);
directory.writeUInt16LE(1, 4);
directory.writeUInt16LE(32, 6);
directory.writeUInt32LE(faviconPng.length, 8);
directory.writeUInt32LE(header.length + directory.length, 12);

await fs.writeFile(
  path.join(root, "public", "favicon.ico"),
  Buffer.concat([header, directory, faviconPng]),
);
