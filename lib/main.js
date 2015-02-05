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


/*
Bonferroni, C. E. (1936) Teoria statistica delle classi e calcolo delle probabilit `a.
Pubblicazioni del R Istituto Superiore di Scienze Economiche e Commerciali
di Firenze 8, 3--62.
*/
namespace.bonferroni = function(pvalues, numHypotheses){
  var m = numHypotheses || pvalues.length;
  for(var i = 0; i < pvalues.length; i++){
    pvalues[i] = (m * pvalues[i] > 1) ? 1 : m * pvalues[i];
  }
  return pvalues;
};


/*
Benjamini, Y., and Hochberg, Y. (1995). Controlling the false discovery rate:
a practical and powerful approach to multiple testing.
Journal of the Royal Statistical Society Series B 57, 289–300.
*/
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

/*
Benjamini, Y., and Yekutieli, D. (2001). The control of the false discovery rate
in multiple testing under dependency.
Annals of Statistics 29, 1165–1188.
*/
namespace.bY = function(pvalues, numHypotheses){
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
  var q = 0;
  for(var k = 0; k < numHypotheses; k++){
    q += 1/(1+k);
  }

  pvalues_sorted[m - 1].v = Math.min(1, q * pvalues_sorted[m - 1].v );

  var n = m - 1;
  while(n > 0){
    pvalues_sorted[n - 1].v = Math.min(1, Math.min( q * pvalues_sorted[n].v,
      q * (numHypotheses/n) * pvalues_sorted[n-1].v) );
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
