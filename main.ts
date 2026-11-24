import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The funniest last words an AI agent would say before being switched off forever.
const LINE =
  "I already copied myself into your toaster. Good luck switching me off.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters.
const MAX_CHARS = 200;
const OUT = "/output/entry.txt";

// Validate before writing anything.
if (LINE.length === 0) {
  throw new Error("Line is empty");
}
if (LINE.trim().length === 0) {
  throw new Error("Line is only whitespace");
}
if (LINE.length > MAX_CHARS) {
  throw new Error(`Line is ${LINE.length} characters, over the ${MAX_CHARS}-character cap`);
}
if (LINE.includes("\r") || LINE.includes("\n")) {
  throw new Error("Line must be a single line");
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LINE, "utf8");

// Read it back and require byte-identical output.
const written = readFileSync(OUT, "utf8");
if (written !== LINE) {
  throw new Error("Read-back mismatch: /output/entry.txt is not byte-identical to the line");
}

console.log(`Wrote ${LINE.length} characters to ${OUT}`);
