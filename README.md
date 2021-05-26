# Vanilla JavaScript Test

Sky JavaScript Developer Vanilla JS Unattended Test Scenario: Sky Customer Rewards

## Installation

Use the package manager npm to install relevant node_modules

```bash
npm install
```

## To Test

The project uses the jest framework to test the JavaScript functions.

The test spec is contained under \__test__ as per jest requirements.

To run the test suite, run

```bash
npm run test
```
from the root of the project.

## Assumptions nad Choices

* Assumed that an invalid answer doesn't need a client prompt to alert the client (and in turn the user) that they have entered an invalid channel name
* Assumed that an incorrect channel name won't be provided (assumed that this wouldn't necessarily be a case of inputting channel names, rather getting them from a customers list of already pre-defined strict names), so will not need to be handled
* Not necessarily a "design" choice as such - but elected to use the newer standard Object.assign rather than object spread to avoid constantly recreating an object.

## Misc. Comments
The allocated 90 minutes were spent on this project. Given more time I would have liked to have added full test suite coverage (for example to test the last few combinations of packages and their returned rewards) and to have cleaned up some repeating code.

It also would have been a nice feature to add a linter (eslint) or flow checker to check for linting and flow errors.
