import fs = require("fs");
import tmp = require("tmp");

export function setupWorkspace() {
  const tmpobj = tmp.dirSync();
  const tmpDir = tmpobj.name;
  console.log(`tmp dir will be ${tmpDir}`);
  return tmpDir
}
