import git = require("nodegit");
import async = require("async");
import fs = require("fs");
import generateSnippet = require("./generateSnippet");

const tfTypesMap = {
  d: "data",
  r: "resource"
};

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}

class snippetClass {
  provider: string;
  resourceType: string;
  providerTypeDir: string;
  snippet: object;
  constructor(provider: string, resourceType: string, providerTypeDir: string) {
    this.provider = provider;
    this.resourceType = resourceType;
    this.providerTypeDir = providerTypeDir;
    this.snippet = {};
  }
}

function downloadGitRepo(workspace, provider, iterateOnFilesFunc) {
  console.log(`Downloading git repo for ${provider}`);
  const providerRepo = `https://github.com/terraform-providers/terraform-provider-${provider}`;
  const providerDir = `${workspace}/${provider}`;
  git.Clone.clone(providerRepo, providerDir).then(() => {
    async.each(Object.keys(tfTypesMap), tfType => {
      let providerTypeDir = `${providerDir}/website/docs/${tfType}`;
      let resourceType = tfTypesMap[tfType];
      var snippetObject = new snippetClass(
        provider,
        resourceType,
        providerTypeDir
      );
      let stats = fs.statSync(providerTypeDir);
      if (stats.isDirectory()) {
        iterateOnFilesFunc(snippetObject, generateSnippet);
      }
    });
  });
}

export = downloadGitRepo;
