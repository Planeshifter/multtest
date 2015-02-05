var _ = require('underscore');

var namespace = {};

namespace.bonferroni = function(pvalues, numHypotheses){
  var m = numHypotheses || pvalues.length;
  for(var i = 0; i < pvalues.length; i++){
    pvalues[i] = (m * pvalues[i] > 1) ? 1 : m * pvalues[i];
  }
  return pvalues;
};

namespace.fdr = function(pvalues, numHypotheses){
  pvalues_sorted = _.clone(pvalues).sort(function(a, b){
    return a - b;
  });

  var m = pvalues.length;
  pvalues_sorted[m - 1] = pvalues_sorted[m - 1];
  var n = m - 1;
  while(n > 0){
    pvalues_sorted[n - 1] = Math.min( pvalues_sorted[n], (numHypotheses/n) * pvalues_sorted[n-1]);
    n--;
  }
  return pvalues_sorted;
};

module.exports = exports = namespace;
