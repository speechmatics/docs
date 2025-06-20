const https = require("node:https");
const http = require("node:http");

module.exports = function (source) {
  const callback = this.async();

  // Extract URL from query parameters
  const urlMatch = this.resourceQuery.match(/url=(.+)$/);
  if (!urlMatch) {
    return callback(null, source);
  }

  const url = decodeURIComponent(urlMatch[1]);
  const protocol = url.startsWith("https:") ? https : http;

  console.log(`Fetching URL: ${url}`);

  protocol
    .get(url, (res) => {
      if (res.statusCode !== 200) {
        return callback(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
      }

      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(
          `Successfully fetched ${url}, content length: ${data.length}`,
        );
        // Return the content as a module that exports the string
        callback(null, `module.exports = ${JSON.stringify(data)};`);
      });
    })
    .on("error", (err) => {
      callback(new Error(`Failed to fetch ${url}: ${err.message}`));
    });
};
