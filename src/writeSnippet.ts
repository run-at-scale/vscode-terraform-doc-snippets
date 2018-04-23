import fs = require("fs");
import lockFile = require("lockfile");

import _ = require("underscore");

function writeSnippet(snippetObject, outfile = "snippets/terraform.json") {
  // console.log(JSON.stringify(snippet, null, 2));
  let resourceName = snippetObject["fullResourceName"];
  let snippet = snippetObject["snippet"][resourceName];
  lockFile.lock("outfile", err => {
    try {
      let allSnippets = JSON.parse(fs.readFileSync(outfile, "utf-8"));
      allSnippets[resourceName] = snippet;
      // let data = _.extend(snippet, allSnippets);
      fs.writeFileSync(outfile, JSON.stringify(allSnippets, null, 2), "utf-8");
    } catch (err) {
      console.log(err);
      lockFile.unlock("outfile", err => {
        console.log("big bad error");
        console.log(err);
      });
    }
    lockFile.unlock("outfile", err => {
      if (err) {
        console.log(err);
      }
    });
    // console.log(err);
  });
}

export = writeSnippet;
