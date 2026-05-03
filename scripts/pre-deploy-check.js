#!/usr/bin/env node
/**
 * PropSight Pre-Deploy Checker
 * Catches ALL known crash patterns before build
 * Run automatically by psb before every deploy
 */
const fs = require("fs");
const path = require("path");

const dirs = ["src/components", "src/hooks", "src/utils", "src/services", "src/context"];
const files = [];
dirs.forEach(d => {
  if (!fs.existsSync(d)) return;
  fs.readdirSync(d).filter(f => f.endsWith(".jsx") || f.endsWith(".js"))
    .forEach(f => files.push(path.join(d, f)));
});
files.push("src/App.jsx");
files.push("src/i18n.js");

let issues = [];
let warnings = [];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const src = fs.readFileSync(file, "utf8");
  const name = path.basename(file);

  // 1. Markdown corruption
  if (/\]\(http/.test(src))
    issues.push(`[CORRUPTION] ${name}: contains ](http — markdown links in source code`);

  // 2. t() used but not imported
  const usesTFunc = /\bt\('[^']+',\s*\w+\)/.test(src);
  const importsTFunc = /import.*\bt\b.*from.*i18n/.test(src);
  if (usesTFunc && !importsTFunc)
    issues.push(`[MISSING_IMPORT] ${name}: uses t() but missing import { t } from '../i18n'`);

  // 3. lang used but not declared
  const usesLang = /,\s*lang\)/.test(src);
  const declaresLang = /const lang\s*=/.test(src) || /\{[^}]*\blang\b[^}]*\}\s*=\s*use/.test(src);
  if (usesLang && !declaresLang)
    issues.push(`[LANG_MISSING] ${name}: uses lang but never declares it`);

  // 4. t used as loop variable (shadows i18n import)
  if (/\.map\(t[^a-zA-Z_$]/.test(src))
    issues.push(`[T_SHADOW] ${name}: .map(t => shadows i18n t() — use tx/tabOpt/opt instead`);

  // 5. tabOpt used in body but not defined as map param
  const tabOptParam = (src.match(/\.map\(tabOpt/g) || []).length;
  const tabOptBody  = (src.match(/tabOpt\./g) || []).length;
  if (tabOptBody > 0 && tabOptParam === 0)
    issues.push(`[TABOPT_UNDEF] ${name}: tabOpt used in body but not defined as map parameter`);

  // 6. Bare t. property access (t.k, t.l, t.v, t.s etc — likely old loop var refs)
  const bareT = src.match(/\bt\.[a-z]\b/g) || [];
  const safeTRefs = bareT.filter(m => !["t.k","t.l","t.v","t.s","t.d","t.r","t.b","t.j","t.a","t.n","t.u","t.e","t.m","t.p"].includes(m));
  const badTRefs = bareT.filter(m => ["t.k","t.l","t.v","t.s","t.d","t.r","t.b","t.j","t.a"].includes(m));
  if (badTRefs.length > 0)
    issues.push(`[T_REF] ${name}: uses ${[...new Set(badTRefs)].join(", ")} — old loop variable refs`);

  // 7. Duplicate const lang
  const langDecls = (src.match(/const lang\s*=/g) || []).length;
  if (langDecls > 1)
    issues.push(`[LANG_DUPLICATE] ${name}: const lang declared ${langDecls} times`);

  // 8. console.log left in (warning only)
  if (/console\.log/.test(src) && !name.includes("monitor") && !name.includes("analyze"))
    warnings.push(`[CONSOLE_LOG] ${name}: has console.log statements`);
});

console.log("\n=== PropSight Pre-Deploy Check ===");
console.log(`Scanned ${files.length} files`);

if (issues.length === 0) {
  console.log("\n✅ All clear — safe to deploy\n");
  process.exit(0);
} else {
  console.log(`\n❌ ${issues.length} issue(s) found — FIX BEFORE DEPLOYING:\n`);
  issues.forEach(i => console.log("  🚨", i));
  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} warning(s):`);
    warnings.forEach(w => console.log("  ⚠️ ", w));
  }
  console.log("");
  process.exit(1);
}
