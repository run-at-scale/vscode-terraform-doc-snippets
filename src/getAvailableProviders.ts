import request = require('request');
import async = require("async");
import { iterateOnDocFiles } from "./iterateOnDocFiles";
const urlBase = 'https://registry.terraform.io'

// handle errors and do pagination
export function getAvailableProviders(tmpDir, snips, downloadGitRepo) {
  const urlSuffix = '/v1/providers?offset=0'
  fetchProviderBatch(urlBase + urlSuffix, snips, tmpDir, downloadGitRepo)
}

function fetchProviderBatch(url, snips, tmpDir, downloadGitRepo) {
  console.log(url)
  request(url, { json: true }, (err, _, body) => {
    if (err) {
        return console.log(err);
    }
    let nextUrl = urlBase + body.meta.next_url
    if (nextUrl != url) {
      fetchProviderBatch(nextUrl, snips, tmpDir, downloadGitRepo)
    }
    async.forEach(body.providers, (element) => {
      downloadGitRepo(tmpDir, element.source, element.name, snips, iterateOnDocFiles)
    });
  });
}
