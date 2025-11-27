# Speechmatics docs

Documentation for Speechmatics APIs, products and other software

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Contributing

We welcome contributions to the docs! Please see `CONTRIBUTING.md` for information on contributions and style.

## Speechmatics org. members

Open a pull request to the `main` branch. The CI pipeline will build and deploy the docs to Vercel.

## Other contributors

Fork this repository, and open a PR against the `main` branch. Note that this will *not* create a preview link.

## Project overview

For UI development, you will need [Node.js](https://nodejs.org/en/download/) to be installed.

### Installation

```
$ npm i
```

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### MixPanel setup

To use Mixpanel, set the `MIXPANEL_PROJECT_TOKEN` environment variable when running the app locally (`npm run start`) or building it (`npm run build`). You can store the token in a `.env.local` file. If you're developing and want to use the token from Vercel's preview environment, run `vercel env pull --environment=preview` to populate the file.


NOTE: The `MIXPANEL_PROJECT_TOKEN` env variable containing the **production** token should be available at build time in order to get a build that uses MixPanel suitable for a production deployment.
