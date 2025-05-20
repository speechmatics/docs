# Speechmatics docs

Documentation for Speechmatics APIs, products and other software

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

This project has been started as part of ongoing work to revamp the existing docs (also built with Docusaurus, but on an older version).

At the moment, this repo is private, and not deployed anywhere. It's just here to get the initial work going before we launch.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
