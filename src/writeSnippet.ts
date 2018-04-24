import fs = require("fs");
import lockFile = require("lockfile");
import _ = require("underscore");

function sortObject(o) {
  return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

// var q = async.queue(function(task, callback) {
//   console.log('hello ' + task.name);
//   callback();
// }, 2);

// // assign a callback
// q.drain = function() {
//   console.log('all items have been processed');
// };

// // add some items to the queue
// q.push({name: 'foo'}, function(err) {
//   console.log('finished processing foo');
// }

function writeSnippet(snippetObject, outfile = "snippets/terraform.json", filelock = "outfile.lock") {
  const resourceName = snippetObject.fullResourceName;
  const snippet = snippetObject.snippet[resourceName];
  // console.log(snippetObject.snippet);
  lockFile.lock(filelock, (err) => {
    try {
      const allSnippets = JSON.parse(fs.readFileSync(outfile, "utf-8"));
      allSnippets[resourceName] = snippet;
      // const sortedSnippets = sortObject(allSnippets);
      fs.writeFileSync(outfile, JSON.stringify(allSnippets, null, 2), "utf-8");
    } catch (err) {
      console.log(err);
      lockFile.unlock(filelock, (innererr) => {
        if (innererr) {
        console.log(`Failed to release lock... again: ${innererr}`);
        }
      });
    }
    lockFile.unlock(filelock, (outererr) => {
      if (outererr) {
        console.log(`Failed to release lock: ${outererr}`);
      }
    });
    console.log(err);
  });
}

export = writeSnippet;
