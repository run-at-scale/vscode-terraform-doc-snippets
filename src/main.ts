import { writeFileSync } from "fs";
import { cleanup } from "./cleanup";
import { downloadGitRepo } from "./downloadGitRepo";
import { getAvailableProviders } from "./getAvailableProviders";
import { setOverrides } from "./setOverrides";
import { sortObject } from "./sortObject";
import setup = require("./setup");

const cap = 1452;

async function main() {
  const tmpDir = setup.setupWorkspace();
  const snips = {};
  getAvailableProviders(tmpDir, snips, downloadGitRepo);
  // TODO: find a better way to count up front the number of processed markdown files OR providers
  await sleep(600);
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
