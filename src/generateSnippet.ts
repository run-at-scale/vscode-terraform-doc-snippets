import getCodeBlock = require("./getCodeBlock");
import path = require("path");

const providersConfig = require("./config.json");

function generateSnippet(snippetObject, writeSnippet) {
  let resourceFileName = snippetObject["docFile"];
  let filename = path.parse(snippetObject["docFile"]).base;
  // maybe define in config the format of the prefix
  let resourceName = filename.split(".")[0];
  let fullResourceName = `${snippetObject["provider"]}-${
    snippetObject["resourceType"]
  }-${resourceName}`;
  snippetObject["fullResourceName"] = fullResourceName;
  snippetObject["snippet"][fullResourceName] = {
    prefix: `tf-${fullResourceName}`,
    description: `Defines ${resourceName}`
  };
  let codeBlock = getCodeBlock(snippetObject["docFile"]).split("\n");
  snippetObject["snippet"][fullResourceName]["body"] = codeBlock;
  writeSnippet(snippetObject);
}

export = generateSnippet;
