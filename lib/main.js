var _ = require('underscore');

var namespace = {};

function range(start, end) {
   var foo = [];
   for (var i = start; i <= end; i++) {
       foo.push(i);
   }
   return foo;
}

function sum(arr){
  var ret = 0;
  for(var i=0; i < arr.length; i++){
    ret += arr[i];
  }
  return ret;
}

namespace.bonferroni = function(pvalues, numHypotheses){
  var m = numHypotheses || pvalues.length;
  for(var i = 0; i < pvalues.length; i++){
    pvalues[i] = (m * pvalues[i] > 1) ? 1 : m * pvalues[i];
  }
  return pvalues;
};

namespace.fdr = function(pvalues, numHypotheses){
  var indices = _.clone(pvalues);
  i = pvalues.length;
  while (i--) {
    indices[i] = { k: i, v: pvalues[i] };
  }
  pvalues_sorted = indices.sort(function (a, b) {
    return a.v < b.v ? -1 : a.v > b.v ? 1 : 0;
  });

  var m = pvalues.length;
  numHypotheses = numHypotheses || pvalues.length;

  pvalues_sorted[m - 1] = pvalues_sorted[m - 1];
  var n = m - 1;
  while(n > 0){
    pvalues_sorted[n - 1].v = Math.min( pvalues_sorted[n].v, (numHypotheses/n) * pvalues_sorted[n-1].v);
    n--;
  }

  j = pvalues.length;
  pvalues_sorted.sort(function(a,b){
    return a.k < b.k ? -1 : a.k > b.k ? 1 : 0;
  });

  while (j--) {
    pvalues_sorted[j] = pvalues_sorted[j].v;
  }
  return pvalues_sorted;
};

module.exports = exports = namespace;
