import { writeFileSync } from "fs";
import { cleanup } from "./cleanup";
import { downloadGitRepo } from "./downloadGitRepo";
import { getAvailableProviders } from "./getAvailableProviders";
import { iterateOnDocFiles } from "./iterateOnDocFiles";
import { setOverrides } from "./setOverrides";
import setup = require("./setup");
import { sortObject } from "./sortObject";

const configuration = require("./config.json");

async function main() {
  const tmpDir = setup.setupWorkspace();
  const snips = {};
  const list = await getAvailableProviders();

  for(let i = 0; i < list.length; i++) {
    const name = list[i];
    let subtotal = Object.keys(snips).length;

    await downloadGitRepo(tmpDir, name, snips, iterateOnDocFiles);

    subtotal = Object.keys(snips).length - subtotal;
    console.log(`provider ${i + 1} of ${list.length}: ${subtotal} snips\n`)
  }

  console.log(`${Object.keys(snips).length} total snips`);

  const overrideSnipsIncluded = setOverrides(snips);
  const sortedSnips = sortObject(overrideSnipsIncluded);

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
