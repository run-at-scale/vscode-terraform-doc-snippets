import fs = require("fs");
import lockFile = require("lockfile");
import _ = require("underscore");
import queue = require("./main");

function sortObject(o) {
  return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

queue.drain = () => {
  console.log('all items have been processed');
};

function writeSnippet(snippetObject, outfile = "snippets/terraform.json") {
  queue.push(snippetObject, outfile = "snippets/terraform.json", (err) => {
    const resourceName = snippetObject.fullResourceName;
    const snippet = snippetObject.snippet[resourceName];
    const allSnippets = JSON.parse(fs.readFileSync(outfile, "utf-8"));
    allSnippets[resourceName] = snippet;
    const sortedSnippets = sortObject(allSnippets);
    fs.writeFileSync(outfile, JSON.stringify(sortedSnippets, null, 2), "utf-8");
  });
}

export = writeSnippet;
