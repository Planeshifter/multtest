#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

# multtest

> adjustments of p-values for multiple comparisons

## Installation

```
npm install multtest
```

## Usage:

Require as follows:

```
var multtest = require('multtest');
```

## API

`multtest` exports the following functions:

### `.bonferroni(pvalues,[numHypotheses])`

Given an input array of pvalues, `pvalues`, this function calculates the Bonferroni correction by multiplying each p-value by *m*, the number of tested hypotheses. This is by default equal to the length of the `pvalues` array, but can be optionally supplied via the `numHypotheses` parameter.

### `.fdr(pvalues,[numHypotheses])`

Given an input array of pvalues, `pvalues`, the `.fdr` function calculates the false-discovery-rate adjusted p-values.

### `.bY(pvalues,[numHypotheses])`

Given an input array of pvalues, `pvalues`, the `.bY` function calculates adjusted p-values according to the method by Benjamini & Yekutieli.

### `.adjustSignificanceLevel(pvalues, alpha)`
This function can be used in the construction of FDR adjusted confidence intervals. It has two parameters: `pvalues`
is an array of p-values, `alpha` is the significance level we wish to control the FDR at. The function returns an adjusted signficance level `alpha_fdr`
which has to be used as the nominal significance level when constructing confidence intervals.
It is calculated via the formula

`alpha_fdr = ( (k + 1) / m ) * alpha`,

where `m` is the total number of hypotheses and `k` is the number of rejected hypotheses.

## License

MIT © [Philipp Burckhardt](http://www.philipp-burckhardt.com)

[npm-url]: https://npmjs.org/package/multtest
[npm-image]: https://badge.fury.io/js/multtest.svg
[travis-url]: https://travis-ci.org/Planeshifter/multtest
[travis-image]: https://travis-ci.org/Planeshifter/multtest.svg?branch=master
[daviddm-url]: https://david-dm.org/Planeshifter/multtest.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/Planeshifter/multtest
