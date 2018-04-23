import tmp = require("tmp");
import fs = require("fs");

function setupWorkspace() {
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

export = setupWorkspace;
