[![NPM version](https://badge.fury.io/js/multtest.svg)](http://badge.fury.io/js/multtest)
[![Build Status](https://travis-ci.org/Planeshifter/multtest.svg)](https://travis-ci.org/Planeshifter/multtest)

# multtest
adjustments of p-values for multiple comparisons


```
npm install multtest
```

Require as follows:

```
var multtest = require('multtest');
```

`multtest` exports the following functions:

## `.bonferroni(pvalues,[numHypotheses])`

Given an input array of pvalues, `pvalues`, this function calculates the Bonferroni correction by multiplying each p-value by *m*, the number of tested hypotheses. This is by default equal to the length of the `pvalues` array, but can be optionally supplied via the `numHypotheses` parameter. 

## `.fdr(pvalues,[numHypotheses])`

Given an input array of pvalues, `pvalues`, the `.fdr` function calculates the false-discovery-rate adjusted p-values. 

## `.bY(pvalues,[numHypotheses])` 

Given an input array of pvalues, `pvalues`, the `.bY` function calculates adjusted p-values according to the method by Benjamini & Yekutieli. 

