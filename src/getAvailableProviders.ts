const octokit = require("@octokit/rest")();

// handle errors and do pagination
export async function getAvailableProviders() {
  let result;
  const list = [];

  do {
    //API paging
    if (result) {
      //repeat API call for page 2+
      result = await octokit.getNextPage(result);
    }
    else {
      //first API call - get page 1
      result = await octokit.repos.getForOrg({
        org: "terraform-providers",
        type: "public",
        sort: "full_name",
        per_page: 100
      });
    }

    //map results to list of provider names
    result.data.forEach((element) => {
      // filter out ".github" and ".hashibot" from the results;
      if (element.name.startsWith("terraform-provider-")) {
        list.push(element.name);
      }
    });
  } while (octokit.hasNextPage(result));

  return list;
}
