# License Compatibility Checker

## Disclaimer

I'm not a Lawyer and have very little knowledge about licenses. This code is super simpel, but should help against obvious license violations.

## Install

```bash
# npm
npm install --save-dev license-ci-checker

# yarn
yarn add -D license-ci-checker
```

## Options

Most options are passed through from [npm-license-crawler](https://github.com/mwittig/npm-license-crawler).

| param                      | description                                                                                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--start directory-path`   | path to the directory the license search should start from. If omitted the current working directory is assumed. Can be declared multiple for multiple entry points. |
| `--production`             | show only production dependencies                                                                                                                                    |
| `--development`            | show only development dependencies                                                                                                                                   |
| `--omitVersion`            | omit version numbers in result (e.g. "npm-license-crawler@0.1.5" becomes "npm-license-crawler")                                                                      |
| `--relativeLicensePath`    | output the relative file path for license files.                                                                                                                     |
| `--onlyDirectDependencies` | show only direct dependencies licenses, i.e., don't list dependencies of dependencies.                                                                               |
