## `Epic React` workshop by [Kent C. Dodds](https://github.com/kentcdodds) 

[https://epicreact.dev/learn/](https://epicreact.dev/learn/)

## Part 7: React Suspense

## What's it about

- explore and compare fetch approaches:
  - **fetch-on-render** with fetch logic in `React.useEffect` on component's first mount
  - **fetch-then-render** when parent is responsible for data fetching and passing it down to the child
  - **render-as-you-fetch** when fetch starts as soon as we have all data needed to fetch (like images urls) without waiting for the component js code to be loaded (pays back with `React.Lazy` and code splitting for chunks) 
- create custom logic for a suspended `resource` with `read()` function from scratch
- handle loading state with `React.Suspense` and errors with `ErrorBoundary`
- implement simple logic for **caching** data
- **suspend images** while loading; combine the app's cache with the built-in browser cache for media
- use `React.Context` to manage cache; implement expiration time for each resource
- explore benefits of loading data and images in parallel to avoid "a waterflow" of resources load
- use `React.SuspenseList` for better UX in apps with multi-parts interface

## Prerequisites

- Install the React DevTools
  ([Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  (recommended),
  [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/))
- Watch Dan Abramov's talk
  [Beyond React 16 | JSConf Iceland 2018](https://www.youtube.com/watch?v=nLF0n9SACd4)
  (33 minutes)
- Experience with React and all hooks

## System Requirements

- [git][git] v2.13 or greater
- [NodeJS][node] `12 || 14 || 15 || 16`
- [npm][npm] v6 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Setup

After you've made sure to have the correct things (and versions) installed, you
should be able to just run a few commands to get set up:

```
git clone https://github.com/kentcdodds/react-suspense.git
cd react-suspense
node setup
```

This may take a few minutes. **It will ask you for your email.** This is
optional and just automatically adds your email to the links in the project to
make filling out some forms easier.

If you get any errors, please read through them and see if you can find out what
the problem is. If you can't work it out on your own then please [file an
issue][issue] and provide _all_ the output from the commands you ran (even if
it's a lot).

If you can't get the setup script to work, then just make sure you have the
right versions of the requirements listed above, and run the following commands:

```
npm install
npm run validate
```

If you are still unable to fix issues and you know how to use Docker 🐳 you can
setup the project with the following command:

```
docker-compose up
```

It's recommended you run everything locally in the same environment you work in
every day, but if you're having issues getting things set up, you can also set
this up using [GitHub Codespaces](https://github.com/features/codespaces)
([video demo](https://www.youtube.com/watch?v=gCoVJm3hGk4)) or
[Codesandbox](https://codesandbox.io/s/github/kentcdodds/react-suspense).

## Running the app

To get the app up and running (and really see if it worked), run:

```shell
npm start
```

This should start up your browser. If you're familiar, this is a standard
[react-scripts](https://create-react-app.dev/) application.

You can also open
[the deployment of the app on Netlify](https://react-suspense.netlify.app/).

## Running the tests

```shell
npm test
```
