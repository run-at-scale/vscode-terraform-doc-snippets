import { writeFileSync } from "fs";
import { cleanup } from "./cleanup";
import { downloadGitRepo } from "./downloadGitRepo";
import { getAvailableProviders } from "./getAvailableProviders";
import setup = require("./setup");

function sortObject(o) {
  return Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});
}

async function main() {
  const tmpDir = setup.setupWorkspace();
  const snips = {};
  getAvailableProviders(tmpDir, snips, downloadGitRepo);
  // TODO: implement a count on markdown files to get this number?
  // TODO: with a count, modify package.json to advertise number of snippets in description
  const cap = 1199;
  while (Object.keys(snips).length < cap) {
    console.log(`${Object.keys(snips).length} of ${cap}`);
    await sleep(20);
  }
  console.log(Object.keys(snips).length);
  const sortedSnips = sortObject(snips);
  writeFileSync(
    "snippets/terraform.json",
    JSON.stringify(sortedSnips, null, 2),
    "utf-8",
  );
  cleanup(tmpDir);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms * 100));
}

main();
