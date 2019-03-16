#!/usr/bin/env node

const crawler = require("npm-license-crawler");
const licenses = require("./licenses.js");
const { license: pkgLicense, name: pkgName } = require(process.cwd() +
	"/package.json");
const colors = require("colors");
const path = require("path");

const args = process.argv.slice(2);


// CHECKS

// onlyDirectDependencies isn't working without name specified
if (args.includes("--onlyDirectDependencies") && !pkgName) {
	console.error(color.red("package.json must have a name attribute"));
}

// OPTIONS

let start = [process.cwd()];
let exclude = [];
if (args.includes("--start") || args.includes("--exclude ")) {
	start = [];
	args.forEach((param, index) => {
		if (param === "--start") {
			start.push(path.join(process.cwd(), args[index + 1]));
		}
		if (param === "--exclude") {
			exclude.push(path.join(process.cwd(), args[index + 1]));
		}
	});
}

const scanOptions = {
	start: start,
	production: args.includes("--production"),
	development: args.includes("--development"),
	omitVersion: args.includes("--omitVersion"),
	relativeLicensePath: args.includes("--relativeLicensePath"),
	onlyDirectDependencies: args.includes("--onlyDirectDependencies"),
};

// HELPER METHODS

function licenseCategory(license) {
	return licenses.hierarchie.find((category) =>
		licenses.licenses[category].includes(license)
	);
}

function compatibleLicenses(license) {
	const category = licenseCategory(license);
	categoryHierarchieIndex = licenses.hierarchie.indexOf(category);
	return Object.keys(licenses.licenses)
		.filter((category, index) => index <= categoryHierarchieIndex)
		.reduce((list, category) => list.concat(licenses.licenses[category]), []);
}

function isCompatible(license) {
	return compatibleLicenses(pkgLicense).includes(
		license.replace(/[\(\)]/, "").trim()
	);
}

// SCAN & CHECK

function check() {
	crawler.dumpLicenses(scanOptions, function(error, dependencies) {
		if (error) {
			console.error(error);
			return process.exit(1);
		}

		const incompatibleDependencies = Object.keys(dependencies).filter(
			(dependency) => {
				const licenses = dependencies[dependency].licenses;
				if (licenses.includes("AND")) {
					return !licenses.split(/AND/).every(isCompatible);
				}
				if (licenses.includes("OR")) {
					return !licenses.split(/OR/).some(isCompatible);
				}
				return !isCompatible(licenses);
			}
		);

		// LOG RESULT
		console.log(`\nYour package license: ${pkgLicense}`);
		console.log("Checking dependency licenses for compatibility...\n");

		if (incompatibleDependencies.length !== 0) {
			incompatibleDependencies.forEach((dependency) => {
				console.error(
					colors.red(
						`❌\tThe License ("${
							dependencies[dependency].licenses
						}") of ${dependency} is incompatible.`
					)
				);
			});
			process.exit(1);
		} else {
			console.log(
				colors.green(
					`✅\tAll dependency licenses seem to be compatible with "${pkgLicense}".`
				)
			);
		}
	});
}
check();
