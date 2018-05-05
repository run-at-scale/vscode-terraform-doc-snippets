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
  providerFull,
  allSnippets,
  iterateOnFilesFunc,
) {
  const provider = providerFull.split("terraform-provider-")[1];
  console.log(`Downloading git repo for ${provider}`);
  // get this from config giving provider config preference, then global, then this default
  const providerRepo = `https://github.com/terraform-providers/${providerFull}`;
  const providerDir = `${workspace}/${provider}`;
  git.Clone.clone(providerRepo, providerDir).then(() => {
    async.each(Object.keys(tfTypesMap), (tfType) => {
      const providerTypeDir = `${providerDir}/website/docs/${tfType}`;
      const resourceType = tfTypesMap[tfType];
      const snippetObject = new SnippetClass(
        provider,
        resourceType,
        providerTypeDir,
      );
      fs.stat(providerTypeDir, (err, data) => {
        if (err === null) {
          iterateOnFilesFunc(snippetObject, allSnippets, generateSnippet);
        }
      });
    });
  });
}
