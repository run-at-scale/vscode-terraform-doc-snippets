import async = require("async");
import fs = require("fs");
import { writeSnippet } from "./writeSnippet";

export function iterateOnDocFiles(snippetObject, allSnippets, generateSnippet) {
  const dir = snippetObject.providerTypeDir;
  const files = fs.readdirSync(dir);
  const pattern = ".markdown";
  const markdownFiles = files.filter((str) => str.indexOf(pattern) !== -1);
  async.forEach(markdownFiles, (filename) => {
    snippetObject.docFile = `${dir}/${filename}`;
    generateSnippet(snippetObject, allSnippets);
  });
}
