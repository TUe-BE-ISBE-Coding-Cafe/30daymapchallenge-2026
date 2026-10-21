// Collects every submission in ../maps/dayNN-<handle>/ into the site:
// copies the map image to static/maps/<folder>/ and writes src/lib/maps.json
// with the fields from the submission's README.md (see maps/_TEMPLATE/README.md).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mapsDir = path.resolve(siteDir, '..', 'maps');
const outImages = path.join(siteDir, 'static', 'maps');
const outJson = path.join(siteDir, 'src', 'lib', 'maps.json');
const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];

// Markdown to plain text: [text](url) -> text, drop backticks and emphasis.
const plain = (s) =>
	s
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[`*_]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

function parseReadme(text) {
	const fields = {};
	const lines = text.split('\n');
	let current = null;
	for (const line of lines) {
		const m = line.match(/^- \*\*(.+?):\*\*\s*(.*)$/);
		if (m) {
			current = m[1].toLowerCase();
			fields[current] = m[2];
		} else if (current && /^\s{2,}\S/.test(line)) {
			fields[current] += ' ' + line.trim();
		} else {
			current = null;
		}
	}
	const learned = text.match(/##\s+What I learned\s*\n([\s\S]*?)(\n##\s|$)/i);
	const title = text.match(/^#\s+(.+)$/m);
	return {
		title: title ? plain(title[1]) : '',
		name: plain(fields['name'] ?? ''),
		dayTheme: plain(fields['day / theme'] ?? ''),
		data: plain(fields['data sources'] ?? ''),
		tools: plain(fields['tools'] ?? ''),
		crs: plain(fields['crs'] ?? ''),
		ai: plain(fields['ai disclosure'] ?? ''),
		learned: learned ? plain(learned[1]) : ''
	};
}

fs.rmSync(outImages, { recursive: true, force: true });
fs.mkdirSync(outImages, { recursive: true });

const entries = [];
const folders = fs.existsSync(mapsDir) ? fs.readdirSync(mapsDir).sort() : [];
for (const folder of folders) {
	const m = folder.match(/^day(\d{1,2})-(.+)$/);
	if (!m) continue; // skips _TEMPLATE and anything not named dayNN-handle
	const dir = path.join(mapsDir, folder);
	if (!fs.statSync(dir).isDirectory()) continue;

	const files = fs.readdirSync(dir);
	const image =
		files.find((f) => /^map\.(png|jpe?g|webp|gif|svg)$/i.test(f)) ??
		files.find((f) => IMAGE_EXT.includes(path.extname(f).toLowerCase()));
	if (!image) {
		console.warn(`skip ${folder}: no image`);
		continue;
	}
	fs.mkdirSync(path.join(outImages, folder), { recursive: true });
	fs.copyFileSync(path.join(dir, image), path.join(outImages, folder, image));

	const readmePath = path.join(dir, 'README.md');
	const info = fs.existsSync(readmePath) ? parseReadme(fs.readFileSync(readmePath, 'utf-8')) : {};
	entries.push({
		folder,
		day: Number(m[1]),
		handle: m[2],
		image: `/maps/${folder}/${image}`,
		...info
	});
}

entries.sort((a, b) => a.day - b.day || a.folder.localeCompare(b.folder));
fs.writeFileSync(outJson, JSON.stringify(entries, null, '\t') + '\n');
console.log(`collected ${entries.length} map(s) from ${path.relative(siteDir, mapsDir)}/`);
