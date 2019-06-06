![](./documentation/images/logo.png?raw=true 'Logo')

# Nextcare

Nextcare is a national healthcare provider search tool built with [Next.js](https://nextjs.org/) and [Now](https://zeit.co/now).

## Overview

## Quick Start

### Installation

```
npm i -g now
npm i
```

### Deploy to Zeit

```
now
```

## Available scripts

### `npm run dev`

To start dev servers for your application and API.

The application will be available at `http://localhost:3000/` and your api server will be be listening port `3001` under `localhost`.

### `npm run lint`

To lint the codebase under `/www` and `/api`.

If you'd like to watch your files, run `npm run lint:watch` to execute [`Eslint Watch`](https://github.com/rizowski/eslint-watch). Linting over only your staged files are available too with `npm run lint-staged`.

### `npm run test`

To run unit tests.

The script will execute [Jest](https://jestjs.io/) to run against your tests and generate coverage report in the application root. If you'd like to run Jest's watch mode, simply run `npm run test:watch`.

### `npm run cz`

To use [Commitizen](http://commitizen.github.io/cz-cli) to generate commit messages.

Using Commitizen to commit your code in the project is important for the release process. In the release process, we will use the commit messages to generate or update `CHANGELOG.md` and git `tag`.

### `npm run release`

To generate `CHANGELOG.md` and tag your commit for release with [Standard Version](https://github.com/conventional-changelog/standard-version).

Standard version will bump your release version according to your commit messages. In order for Standard version to parse your our commit messages properly, the message should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

## Build process and workflow

The workflow is following [Trunk Based Development](https://trunkbaseddevelopment.com/). Each branch is a trunk and once the the branch is merged to master and pushed, **Zeit Now** will start the deploy process.

To start developing, Please run `npm run dev`. The project has integrated with a couple of git hooks with [Husky](https://github.com/typicode/husky).

- **Pre-commit**: Husky will run linter over your staged files.
- **Pre-push**: Husky will run linter and unit test against the project to make sure there is no linting errors and pass all the tests.

Once the branch is ready to merge, please run `npm run release` to update `CHANGELOG.me` and generate tag with a version bump. Standard version will commit the change for us when it finishes the process. Execute `git push --follow-tags <remote> <branch>` to push the branch with tags.

## Architecture

![Architecture](./documentation/images/architecture.png?raw=true 'Architecture')

## Frontend structure

![Client](./documentation/images/client.png?raw=true 'Client')

![](./documentation/images/frontend-structure.png?raw=true 'Frontend')

## Backend structure

![Server](./documentation/images/server.png?raw=true 'Server')

## Database structure

![Database](./documentation/images/database.png?raw=true 'Database')

## Analysis

![Lighthouse](./documentation/images/lighthouse.png?raw=true 'Lighthouse')

## UI/UX

### Phone

![signin-phone](./documentation/images/signin-phone.png?raw=true 'signin-phone')
![search-phone](./documentation/images/search-phone.png?raw=true 'search-phone')
![search-filter-phone](./documentation/images/search-filter-phone.png?raw=true 'search-filter-phone')

### Tablet

![login-tablet](./documentation/images/login-tablet.png?raw=true 'signin-tablet')
![search-tablet](./documentation/images/search-tablet.png?raw=true 'search-tablet')

### Desktop

![signin-desktop](./documentation/images/signin-desktop.png?raw=true 'signin-desktop')
![search-desktop](./documentation/images/search-desktop.png?raw=true 'search-desktop')
