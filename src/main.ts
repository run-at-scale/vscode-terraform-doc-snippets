import async = require("async");
import downloadGitRepo = require("./downloadGitRepo");
import iterateOnDocFiles = require("./iterateOnDocFiles");
import setup = require("./setup");
// import cleanup = require("./cleanup");

// TODO: load this a more conventional way that makes ts happy
const providersConfig = require("./config.json");

const main = () => {
  const queue = setup.createQueue();
  const tmpDir = setup.setupWorkspace();
  async.forEach(Object.keys(providersConfig.providers), (provider) => {
    downloadGitRepo(tmpDir, provider, iterateOnDocFiles);
  });
};

// XXX need to clean up local files when all writes are complete


main();

export = queue;
