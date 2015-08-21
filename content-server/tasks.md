# tasks
When writing code there's a need to automate repetitive tasks. Npm has built in
support for automation through `npm scripts`. These scripts live under the
`scripts` key in `package.json`. In this section we'll cover some common
scripting scenarios and how to deal with them.

- [npm scripts]()
- [Example: simple]()
- [Example: testing]()
- [Example: github-pages]()

## npm scripts
Npm scripts is the task runner provided by npm. Scripts themselves are regular
shell. For convenience all files in the `./node_modules/.bin` folder are
imported and made available as globals within `npm scripts`.

Common uses for scripts are:
- compiling assets before uploading
- reloading a server when files change
- running tests
- verifying dependencies
- compiling static addons

## Example: simple
__./package.json__
```json
{
  "name": "app-api",
  "version": "1.0.0",
  "scripts": {
    "hello": "echo hello world"
  },
  "dependencies": {}
}
```

__cli__
```sh
$ npm run hello
```

## Example: testing
This is a relatively complex test setup. `test` is the core script that's run,
but I've included some other scripts to show off a real-world testing setup.

- [`depencency-check`](https://github.com/maxogden/dependency-check) for
  validating dependencies.
- [`tape`](https://github.com/substack/tape) for running tests (inside
  `test.js`).
- [`standard`](https://github.com/feross/standard) for linting.
- [`istanbul`](https://github.com/gotwarlost/istanbul) for test coverage.
- [`watch`](https://github.com/mikael/watch) for rerunning tests on file
  change.

__./package.json__
```json
{
  "name": "app-api",
  "version": "1.0.0",
  "scripts": {
    "deps": "dependency-check . && dependency-check . --extra --no-dev",
    "test": "standard && npm run deps && NODE_ENV=test node test",
    "test:watch": "watch 'npm test'",
    "test:cov": "standard && npm run deps && NODE_ENV=test istanbul cover test.js"
  },
  "devDependencies": {
    "istanbul": "^0.3.17",
    "standard": "^5.0.2",
    "tape": "^4.2.0",
    "watch": "^0.16.0"
  }
}
```

__cli__
```sh
$ npm run test:watch
```

## Example: github-pages
This script will build a browserify bundle, copy a `CNAME` and `index.html` to
`./dist` and then deploy that folder to GitHub Pages when the version changes.
When `npm version <patch|minor|major>` is run, an `npm hook` is triggered.
Command are run in the following order:
- `npm hook: preversion` - is triggered and runs `npm run clean`
- `npm run clean` - removes previous build artifacts
- `npm version` - updates the version
- `npm run postversion` - is triggered and runs its first half: `npm run build`
- `npm run build` - runs `build:browserify`, `build:cname` and `build:html`.
- `npm run postversion` - resumes and deploys `./dist` to the `gh-pages`
  branch.

For the sake of example
we've broken up `build` into separate scripts, but feel free to use tools such
as `gasket` or `brick-router` for more complex scenarios.

__./package.json__
```json
{
  "name": "app-api",
  "version": "1.0.0",
  "scripts": {
    "build": "npm run build:{browserify,cname,html}",
    "build:browserify": "browserify index.js -o dist/bundle.js",
    "build:cname": "cp CNAME ./dist/CNAME",
    "build:html": "cp index.html ./dist/index.html",
    "clean": "rm -rf dist",
    "postversion": "npm run build && gh-pages -d ./dist -b gh-pages",
    "preversion": "npm run clean",
  },
  "devDependencies": {
    "istanbul": "^0.3.17",
    "standard": "^5.0.2",
    "tape": "^4.2.0",
    "watch": "^0.16.0"
  }
}
```

```sh
$ npm version patch
```
