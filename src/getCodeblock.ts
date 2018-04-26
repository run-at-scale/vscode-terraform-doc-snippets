import fs = require("fs");
import codeBlocks = require("gfm-code-blocks");

const providersConfig = require("./config.json");

export function getCodeBlock(docPath, codeBlockIndex = 0) {
  const blocks = codeBlocks(fs.readFileSync(docPath, "utf-8"));
  if (blocks.length + 1 >= codeBlockIndex) {
    // is this slice size always correct?
    return blocks[codeBlockIndex].code.slice(1, -1);
  }
}
