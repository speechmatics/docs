import path from "node:path";

export const sourceLoaderPlugin = () => {
  return {
    name: "source-loader-plugin",
    configureWebpack(config) {
      // console.log("Webpack Configuration:");
      // console.log("Rules:", config.module.rules);
      return {
        module: {
          rules: [
            {
              // Load Python and text files as raw assets
              test: /\.py$|\.txt$|\.sh$/,
              type: "asset/source",
            },
            {
              // Load JS files as raw assets when requested with ?raw query
              test: /\.js$|\.ts$|\.tsx$|\.mjs$|\.html$|\.yml$|\.yaml$/,
              resourceQuery: /raw/,
              // With Webpack 5 we shouldn't need raw-loader
              // But because Docusaurus uses babel-loader for all JS files by default,
              // doing it like above for txt and py files strips line breaks and whitespace
              // TODO: Configure custom JS loader that isn't babel, and remove the raw-loader dependency
              // one day it will be legacy.
              use: "raw-loader",
            },
            {
              // Load content from URLs when requested with ?url= query
              resourceQuery: /url=/,
              use: path.resolve(__dirname, "../scripts/url-loader.js"),
            },
          ],
        },
      };
    },
  };
};
