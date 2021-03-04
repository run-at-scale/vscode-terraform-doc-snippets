import async = require("async");
import fs = require("fs");
import git = require("nodegit");
import { generateSnippet } from "./generateSnippet";

const configuration = require("./config.json");

const tfTypesMap = {
  d: "data",
  r: "resource",
};

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

export async function downloadGitRepo(
  workspace,
  providerRepo,
  providerName,
  allSnippets,
  iterateOnFilesFunc,
) {
  console.log(`Downloading git repo for ${providerName} at ${providerRepo}`);
  const shortProviderName = providerName.split("terraform-provider-")[1]
  const providerOrg = providerRepo.split("/")[providerRepo.split("/").length - 2]
  const providerDir = `${workspace}/${providerOrg}/${providerName}`;
  const path_overrides = configuration.doc_root_path_overrides
  await git.Clone.clone(providerRepo, providerDir).then(() => {
    async.each(Object.keys(tfTypesMap), (tfType) => {
      const providerTypeDir = path_overrides.hasOwnProperty(shortProviderName) ? `${providerDir}/${path_overrides[shortProviderName][tfType]}` : `${providerDir}/website/docs/${tfType}`;
      const resourceType = tfTypesMap[tfType];
      const snippetObject = new SnippetClass(
        shortProviderName,
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
