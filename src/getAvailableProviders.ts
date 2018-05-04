const octokit = require("@octokit/rest")();
import { iterateOnDocFiles } from "./iterateOnDocFiles";

// error handle and do pagination
export function getAvailableProviders(tmpDir, snips, processRepo) {
  octokit.repos.getForOrg(
    { org: "terraform-providers", type: "public", per_page: 100 },
    (error, result) => {
      result.data.forEach((element) => {
        processRepo(tmpDir, element.name, snips, iterateOnDocFiles);
      });
    },
  );
}
