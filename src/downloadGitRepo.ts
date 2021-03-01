import async = require("async");
import fs = require("fs");
import git = require("nodegit");
import { generateSnippet } from "./generateSnippet";

const tfTypesMap = {
  d: "data",
  r: "resource",
};

// XXX is this the right place to instantiate?
class SnippetClass {
  public provider: string;
  public resourceType: string;
  public providerTypeDir: string;
  public snippet: object;
  constructor(provider: string, resourceType: string, providerTypeDir: string) {
    this.provider = provider;
    this.resourceType = resourceType;
    this.providerTypeDir = providerTypeDir;
    this.snippet = {};
  }
}

export function downloadGitRepo(
  workspace,
  providerRepo,
  providerName,
  allSnippets,
  iterateOnFilesFunc,
) {
  console.log(`Downloading git repo for ${providerName} at ${providerRepo}`);
  const providerDir = `${workspace}/${providerName}`;
  git.Clone.clone(providerRepo, providerDir).then(() => {
    async.each(Object.keys(tfTypesMap), (tfType) => {
      const providerTypeDir = `${providerDir}/website/docs/${tfType}`;
      const resourceType = tfTypesMap[tfType];
      const snippetObject = new SnippetClass(
        providerName,
        resourceType,
        providerTypeDir,
      );
      fs.stat(providerTypeDir, (err, _) => {
        if (err === null) {
          iterateOnFilesFunc(snippetObject, allSnippets, generateSnippet);
        }
      });
    });
  });
}
