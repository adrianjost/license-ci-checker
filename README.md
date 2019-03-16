# License CI Checker

[![license](https://img.shields.io/npm/l/license-ci-checker.svg)](./LICENSE) [![npm version](https://img.shields.io/npm/v/license-ci-checker.svg)](https://www.npmjs.com/package/license-ci-checker) [![npm downloads](https://img.shields.io/npm/dt/license-ci-checker.svg)](https://www.npmjs.com/package/license-ci-checker)

[![Build Status](https://travis-ci.com/adrianjost/license-compatibility-checker.svg?branch=master)](https://travis-ci.com/adrianjost/license-compatibility-checker) ![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/license-ci-checker.svg)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Disclaimer

I'm not a Lawyer and have very little knowledge about licenses. This code is super simpel, but should help against obvious license violations. I am not responsible for possible misjudgments, false explanations and descriptions

## Install

```bash
# npm
npm install --save-dev license-ci-checker

# yarn
yarn add -D license-ci-checker
```

### Usage examples

#### package.json

```json
{
	"scripts": {
		"test-licenses": "license-ci-check --production"
	}
}
```

#### command line

```bash
license-ci-check --production
```

## Options

Most options are passed through from [npm-license-crawler](https://github.com/mwittig/npm-license-crawler).

| param                      | default  | description                                                                                                                                                          |
|----------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--start directory-path`   | `["./"]` | path to the directory the license search should start from. If omitted the current working directory is assumed. Can be declared multiple for multiple entry points. |
| `--exclude directory-path` | `[]`     | path to a directory to be excluded (and its subdirectories) from the search (behaves like `--start`)                                                                 |
| `--unknown`                | `false`  | show only licenses that can't be determined or have been guessed.                                                                                                    |
| `--dependencies`           | `false`  | show only third-party licenses, i.e., only list the dependencies defined in package.json.                                                                            |
| `--production`             | `false`  | show only production dependencies                                                                                                                                    |
| `--development`            | `false`  | show only development dependencies                                                                                                                                   |
| `--onlyDirectDependencies` | `false`  | show only direct dependencies licenses, i.e., don't list dependencies of dependencies.                                                                               |
| `--omitVersion`            | `false`  | omit version numbers in result (e.g. "npm-license-crawler@0.1.5" becomes "npm-license-crawler")                                                                      |
| `--relativeLicensePath`    | `false`  | output the relative file path for license files.                                                                                                                     |

## How does it work?

Licenses can be categorized with a hierarchie. This package checks which license you are using and in which category it belongs. Then it crawls all your licenses dependencies and checks if there licenses are in the same category as yours or below. If not, it throws an error.

### License compatiblity

![license categories](https://janelia-flyem.github.io/images/open_licenses.png)

![license compatibility](https://raw.githubusercontent.com/HansHammel/license-compatibility-checker/HEAD/licenses.png)
