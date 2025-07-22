# Speechmatics docs

Documentation for Speechmatics APIs, products and other software

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

This project has been started as part of ongoing work to revamp the existing docs (also built with Docusaurus, but on an older version).

At the moment, this repo is private, and is deployed to Vercel for visibility. It's just here to get the initial work going before we launch.

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

### Deployment

TBD

NOTE: The `MIXPANEL_PROJECT_TOKEN` env variable containing the **production** token should be available at build time in order to get a build that uses MixPanel suitable for a production deployment.
