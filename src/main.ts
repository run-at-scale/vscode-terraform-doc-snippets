import { writeFileSync } from "fs";
import { cleanup } from "./cleanup";
import { downloadGitRepo } from "./downloadGitRepo";
import { iterateOnDocFiles } from "./iterateOnDocFiles";
import { getAvailableProviders } from "./getAvailableProviders";
import { setOverrides } from "./setOverrides";
import setup = require("./setup");
import { sortObject } from "./sortObject";
import { exit } from "process";

const configuration = require("./config.json");

async function main() {
  const tmpDir = setup.setupWorkspace();
  const snips = {};
  const providersList = await getAvailableProviders();
  console.log(providersList);
  exit

  // for(let i = 0; i < providersList.length; i++) {
  //   const name = providersList[i];
  //   let subtotal = Object.keys(snips).length;

  //   await downloadGitRepo(tmpDir, name, snips, iterateOnDocFiles);

  //   subtotal = Object.keys(snips).length - subtotal;
  //   console.log(`provider ${i + 1} of ${providersList.length}: ${subtotal} snips\n`)



  // getAvailableProviders(tmpDir, snips, downloadGitRepo);
  // // TODO: find a better way to count up front the number of processed markdown files OR providers
  // await sleep(600);
  // while (Object.keys(snips).length < cap) {
  //   console.log(`${Object.keys(snips).length} of ${cap}`);
  //   await sleep(20);
  // }
  // console.log(Object.keys(snips).length);
  // const overrideSnipsIncluded = setOverrides(snips);
  // const sortedSnips = sortObject(overrideSnipsIncluded);
  // writeFileSync(
  //   "snippets/terraform.json",
  //   JSON.stringify(sortedSnips, null, 2),
  //   "utf-8",
  // );
  // cleanup(tmpDir);
}

main();
