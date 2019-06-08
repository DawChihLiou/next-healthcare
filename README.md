![Nextcare](./documentation/images/logo.png?raw=true 'Logo')

# Nextcare

Nextcare is a national healthcare provider search tool built with [Next.js](https://nextjs.org/) and [Now](https://zeit.co/now).

## Overview

- [Quick Start](#quick-start)
- [Available scripts](#available-scripts)
- [Build process and workflow](#build-process-and-workflow)
- [Architecture](#architecture)
- [Frontend structure](#frontend-structure)
- [Backend structure](#backend-structure)
- [Database structure](#database-structure)
- [Analysis](#analysis)
- [UI/UX Design](#ui/ux-design)
- [Conclusion](#conclusion)

## Quick Start

### Installation

```
npm i
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

The project is using [Prettier](https://prettier.io/) and Eslint to lint the code on the fly. Please make sure you integrate them in your editor. Please turn on `formatOnSave` for the optimal developer experience.

## Architecture

![Architecture](./documentation/images/architecture.png?raw=true 'Architecture')

We embrace Cloud computing solutions for the scalability. The project with build and deployed with [Serverless](https://en.wikipedia.org/wiki/Serverless_computing) architecture. Each page in the application and API endpoint is a standalone lambda function. This approach gives us the flexibility of Micro-services and empowers FaaS.

We have 4 Lambdas that are being deployed on Zeit Now.

- **Index page** - `/www/pages/index`: Login with [Google Sign-In](https://developers.google.com/identity/)
- **Search page** - `/www/pages/search`: provide searching and filtering functionalities the the users to look for healthcare providers.
- **Authorization API** - `/api/auth`: process signin information form Google Sign-in and response with user information with access token.
- **Search API** - `/api/provider`: process filter criteria and response with found record from Database.

We adapt NoSQL database for this application. [MongoDB](https://www.mongodb.com) offers scalability and flexibility to query and optimize over data. Its data structure in JSON-like format creates harmony in data throughout the application that increase the agility and speed of the development cycle and developer experience.

We deploy the database on [mLab](https://mlab.com/), which is a distributed cloud Database-as-a-Service for MongoDB. It complements well with serverless architecture and it offer great tooling around backup, security, and analytics.

## Frontend structure

![Client](./documentation/images/client.png?raw=true 'Client')

The project adapt [server side rendering](https://dev.to/sunnysingh/the-benefits-and-origins-of-server-side-rendering-4doh) for performance optimization. Client side routing and server side routing are supported in page navigation. This way, we can benefit from SSR in performance boost and still have seamless navigation for better user experience.

### Technology

- [React](https://reactjs.org/): a component based UI library to effectively render declarative views. We are using [React Hooks](https://reactjs.org/docs/hooks-intro.html) for code quality and performance optimization.
- [Redux](https://redux.js.org/): a functional state management library that allow us to seperate application state from components to create a clean structure.
- [Redux Thunk](https://github.com/reduxjs/redux-thunk): Thunks handles side effects to keep components as pure functions and asynchronously update Redux store.
- [Material UI](https://material-ui.com/): a comprehensive UI library with great design system that aims for optimal user experience
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro): a light-weight yet strong testing library for React.
- [Reselect](https://github.com/reduxjs/reselect): an optimal selector library to select state properties from redux store. **Note**: It has been removed from the project dependency because of lack of use case with the current business requirement. However, it is worth mentioning since it plays a key part of the frontend structure.

### UI Flow

To have a closer look of how each part work together, please take a look at the following diagram.

![Frontend](./documentation/images/frontend-structure.png?raw=true 'Frontend')

When an [Event](https://reactjs.org/docs/events.html) is triggered in a component, the store dispatches an [**Action**](https://redux.js.org/basics/actions) that carries data in the payload in its callback function. An action persists a structure as following

```js
{ type: String, payload: Any }
```

By dispatching an action, the [Reducer](https://redux.js.org/basics/reducers) in the store knows how to use the payload and update its state. If the action is an **async** action, the Thunk will perform the tasks (HTTP requests, logging, etc.) and dispatch simple actions along the way until the thunk is completed.

The component then will consume the state in the store by using selectors to select the state properties it requires to render. Once the component re-computes and being rendered with the updated state, the flow completes.

## Backend structure

![Server](./documentation/images/server.png?raw=true 'Server')

### Technology

- [Micro](https://github.com/zeit/micro): a asynchronous HTTP microservice library to handle requests and responses
- [Micro Router](https://github.com/pedronauck/micro-router): a router that handles routes of APIs.
- [Mongoose](https://mongoosejs.com/): an ORM for MongoDB. It offers rich toolsets to write functional interactions with database.

Our backend are composed with Lambda functions in a Serverless, Function-as-a-Service cloud architecture. Each Lambda is a function with a signature as following

```js
function(req: Object, res: Object): void
```

There are two APIs

### **POST** `/api/auth`

To sign in user with Google Sign-In information.

It will find the user based on google Id and update access token in the database. If it is a new user, a new user in database will be created.

**Note**: We are reusing google's access token as the applications access token for the purpose of demonstration.

**Request**

```js
{
  body: {
    accessToken: String,
    email: String,
    familyName: String,
    givenName: String,
    googleId: String,
    imageUrl: String,
    name: String
  }
}
```

**Response**

Code **200**: Ok

```js
{
  body: {
    accessToken: String,
    email: String,
    familyName: String,
    givenName: String,
    googleId: String,
    imageUrl: String,
    name: String
  }
}
```

Code **500**: Internal Error

```js
{
  body: {
      { error: { details: Error }
  }
}
```

### **GET** `/api/providers`

Returns healthcare provider records.

A authorization Bearer token has to be included in the header

**Request**

```js
{
  headers: {
    authorization: String,
  }
  query: String
}
```

**Query parameters**

```js
{
  state?: String,
  min_discharges?: String,
  max_discharges?: String,
  min_average_covered_charges?: String,
  max_average_covered_charges?: String,
  min_average_medicare_payments?: String,
  max_average_medicare_payments?: String,
  return_fields?: String,
}
```

**Response**

Code **200**: Ok

```js
{
  body: {
    data: {
      averageCoveredCharges: Number;
      averageMedicarePayments: Number;
      averageTotalPayments: Number;
      drgDefinition: String;
      hospitalReferralRegionDescription: String;
      providerCity: String;
      providerId: String;
      providerName: String;
      providerState: String;
      providerStreetAddress: String;
      providerZipCode: Number;
      totalDischarges: Number;
      _id: String;
    }
  }
}
```

Code **401**: Unauthorized

```js
{
  body: {
      { error: { details: String }
  }
}
```

Code **500**: Internal Error

```js
{
  body: {
      { error: { details: Error }
  }
}
```

## Database structure

![Database](./documentation/images/database.png?raw=true 'Database')

We have two collections in database: **users** and **providers**

### User schema

```js
{
  email: String,
  familyName: String,
  givenName: String,
  googleId: String,
  imageUrl: String,
  name: String,
  accessToken: String,
}
```

### Provider schema

```js
{
  drgDefinition: String,
  providerId: Number,
  providerName: String,
  providerStreetAddress: String,
  providerCity: String,
  providerState: String,
  providerZipCode: Number,
  hospitalReferralRegionDescription: String,
  totalDischarges: Number,
  averageCoveredCharges: Number,
  averageTotalPayments: Number,
  averageMedicarePayments: Number,
}
```

## Analysis

The test performance [Synthetic monitoring](https://en.wikipedia.org/wiki/Synthetic_monitoring) is done by [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/).

With the current build, the performance metrics are listed bellow

**Mobile** with Simulated Fast 3G, 4x CPU Slowdown throttling

- First Contentful Paint: 1.6s
- First Meaningful Paint: 2.3s
- Speed Index: 3.4s
- First CPU Idle: 3.2s
- Time to Interactive: 3.2s
- Estimated Input Latency: 140ms

![Lighthouse](./documentation/images/lighthouse-phone.png?raw=true 'Lighthouse')

**Desktop** with no throttling

- First Contentful Paint: 0.6s
- First Meaningful Paint: 1.6s
- Speed Index: 1.0s
- First CPU Idle: 1.6s
- Time to Interactive: 1.6s
- Estimated Input Latency: 20ms

![Lighthouse](./documentation/images/lighthouse-desktop-no-throttle.png?raw=true 'Lighthouse')

## UI/UX Design

The Project follows Mobile-first and responsive design principle and adapt the content of the pages responsively according to viewport size.

The design is evaluated with [Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) to cover User experience evaluation.

Please find the following screenshots for the responsive design demonstration.

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

## Future Improvement

- Login page showing sign in result from Google Sign-In. Currently it does not reflect whether signin is successful or failed.
- More sophisticated way to handle cookie with authorization information.
- Remove "no data found" message when initiating the Search page.
- Show Desktop filter when scrolling down to make it more accessible to the users.

## Conclusion

The project has put

- architecture
- performance
- development process
- release pipeline
- user experience
- scalability

in mind to deliver optimal quality product with short Time to Market. The technology stack is flexible and proven effective to deliver product for individuals or for teams while focus on delivering great User Experience to the customers.
