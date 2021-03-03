import path = require("path");
import { getCodeBlock } from "./getCodeBlock";

export function generateSnippet(snippetObject, allSnippets) {
  const filename = path.parse(snippetObject.docFile).base;
  const resourceName = filename.split(".")[0];
  const fullResourceName = `${snippetObject.provider}-${snippetObject.resourceType}-${resourceName}`;
  snippetObject.snippet[fullResourceName] = {
    description: `Defines ${resourceName}`,
    prefix: `tf-${fullResourceName}`,
  };
  const codeBlock = getCodeBlock(snippetObject.docFile).split("\n");
  snippetObject.snippet[fullResourceName].body = codeBlock;
  allSnippets[fullResourceName] = snippetObject.snippet[fullResourceName];
}
