import async = require("async");
import fs = require("fs");
import writeSnippet = require("./writeSnippet");

function iterateOnDocFiles(snippetObject, generateSnippet) {
  const dir = snippetObject["providerTypeDir"];
  const files = fs.readdirSync(dir);
  const pattern = ".markdown";
  const markdownFiles = files.filter(str => str.indexOf(pattern) !== -1);
  // https://stackoverflow.com/questions/5050265/javascript-node-js-is-array-foreach-asynchronous

  async.forEach(markdownFiles, filename => {
    snippetObject["docFile"] = `${dir}/${filename}`;
    generateSnippet(snippetObject, writeSnippet);
  });
}

export = iterateOnDocFiles;
