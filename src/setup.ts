import async = require("async");
import fs = require("fs");
import tmp = require("tmp");

export function setupWorkspace() {
  const tmpobj = tmp.dirSync();
  const tmpDir = tmpobj.name;
  const outfile = "snippets/terraform.json";
  console.log(`tmp dir will be ${tmpDir}`);
  if (fs.exists(outfile)) {
    fs.unlink(outfile);
  }
  fs.writeFileSync(outfile, "{}", "utf-8");
  return tmpDir;
}

export const createQueue = async.queue((task, callback) => {
  // console.log('hello ' + task.name);
  callback();
}, 1);
