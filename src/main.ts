// import async = require("async");
import { writeFileSync } from "fs";
import { cleanup } from "./cleanup";
import { downloadGitRepo } from "./downloadGitRepo";
import { iterateOnDocFiles } from "./iterateOnDocFiles";
import { getAvailableProviders } from "./getAvailableProviders";
import { setOverrides } from "./setOverrides";
import { sortObject } from "./sortObject";
import setup = require("./setup");


async function main() {
  const tmpDir = setup.setupWorkspace();
  const snips = {};
  const downloadedProviders = [];
  try {
    const providersList = Array.from(await getAvailableProviders());

    for(let i = 0; i < providersList.length; i++) {
    // async.each(providersList, (providerSource) => {
      const providerSource = providersList[i];
      const providerName = providerSource.split("/").pop();
      await downloadGitRepo(tmpDir, providerSource, providerName, snips, iterateOnDocFiles);
      downloadedProviders.push(providerName);
      console.log(`downloaded provider ${downloadedProviders.length} of ${providersList.length}\n`);
      console.log("snippets subtotal:" + Object.keys(snips).length);
    }
    // });

    console.log("snippets total:" + Object.keys(snips).length);
    const overrideSnipsIncluded = setOverrides(snips);
    const sortedSnips = sortObject(overrideSnipsIncluded);
    writeFileSync(
      "snippets/terraform.json",
      JSON.stringify(sortedSnips, null, 2),
      "utf-8",
    );
  }
  catch {
    console.log('encountered an error')
  }
  finally {
    cleanup(tmpDir);
  }
}

main();
