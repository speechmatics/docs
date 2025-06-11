import type { Plugin } from "@docusaurus/types";

export default function (): Plugin {
  return {
    name: "yaml-loader-plugin",
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.yaml$/,
              use: [
                {
                  loader: "yaml-loader",
                  options: { name: "assets/files/[name]-[hash].[ext]" },
                },
              ],
            },
          ],
        },
      };
    },
  };
}
