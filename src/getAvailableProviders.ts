import request = require('request');

const urlBase = 'https://registry.terraform.io'

export async function getAvailableProviders() {
  const urlSuffix = '/v1/providers?offset=0'
  let result;
  let url;
  const list = [];

  do {
    // API paging
    if (result.hasOwnProperty('meta')) {
      //repeat API call for page 2+
      url = urlBase + result.meta.next_url;
      result = await request(url, { json: true }, (err, _, body) => {
        if (err) {
            return console.log(err);
        }
        return body
      });
    }
    else {
      //first API call - get page 1
      url = urlBase + urlSuffix;
      result = await request(url, { json: true }, (err, _, body) => {
        if (err) {
            return console.log(err);
        }
        return body
      });
    }
    console.log(result)
    result.providers.forEach((element) => {
      list.push(element.source);
    });
  } while (urlBase + result.meta.next_url != url);

  return list;
}
