import async = require("async");
import setup = require("./setup");
import downloadGitRepo = require("./downloadGitRepo");
import iterateOnDocFiles = require("./iterateOnDocFiles");
// import cleanup = require("./cleanup");

const providersConfig = require("./config.json");

const main = () => {
  let tmpDir = setup();
  async.forEach(Object.keys(providersConfig["providers"]), provider => {
    downloadGitRepo(tmpDir, provider, iterateOnDocFiles);
  });
};

// XXX need to clean up when all writes are complete

main();
