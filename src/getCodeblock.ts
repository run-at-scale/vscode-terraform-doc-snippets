import fs = require("fs");
import codeBlocks = require("gfm-code-blocks");

// figure out a way to pass overrides without creating a mess
// const providersConfig = require('./config.json');

function getCodeBlock(docPath, codeBlockIndex = 0) {
  let blocks = codeBlocks(fs.readFileSync(docPath, "utf-8"));
  if (blocks.length + 1 >= codeBlockIndex) {
    // potentially create a function to alter resource line to something like
    //  "resource \"aws_waf_xss_match_set\" \"${MyAWSResource}\" {",
    // is this slice size always correct?
    return blocks[codeBlockIndex].code.slice(1, -1);
  }
}

export = getCodeBlock;
