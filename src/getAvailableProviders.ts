const fetch = require('node-fetch');
const urlBase = 'https://registry.terraform.io'

export async function getAvailableProviders() {
  const urlSuffix = '/v1/providers?tier=partner%2Cofficial&offset=0'
  const sourceSet = new Set()
  let url;
  let nextUrl;

  do {
    // API paging
    if (sourceSet.size == 0) {
      //first API call - get page 1
      url = urlBase + urlSuffix;
      await fetch(url)
        .then(res => res.json())
        .then(function(json) {
          nextUrl = urlBase + json.meta.next_url;
          json.providers.forEach((element) => {
            sourceSet.add(element.source);
          });
      });
    }
    else {
      //repeat API call for page 2+
      url = nextUrl;
      await fetch(url)
      .then(res => res.json())
      .then(function(json) {
        nextUrl = urlBase + json.meta.next_url;
        json.providers.forEach((element) => {
          sourceSet.add(element.source);
        });
      });
    }
  } while (nextUrl != url );
  return sourceSet;
}
