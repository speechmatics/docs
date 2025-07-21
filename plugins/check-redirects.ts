import { checkRedirects } from "../scripts/redirects/check-redirects";

export const checkRedirectsPlugin = () => {
  return {
    name: "check-redirects-plugin",
    async postBuild({ routesPaths }) {
      checkRedirects(routesPaths);
    },
  };
};
