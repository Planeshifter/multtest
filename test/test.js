var chai = require('chai');
var expect = chai.expect;

var chaiDeepCloseTo = require("chai-deep-closeto");
chai.use(chaiDeepCloseTo);

var fdr = require("../lib/main.js").fdr;
var bY = require("../lib/main.js").bY;
var bonferroni = require("../lib/main.js").bonferroni;

describe("fdr()", function(){
  it("correctly calculates adjusted pvalues for arr", function(){
    var adjPvalues = fdr([0.1,0.2,0.05,0.4,0.01]);
    expect(adjPvalues).to.be.clsTo([0.1667,0.25,0.125,0.4,0.05], 0.01);
  });
  it("correctly calculates adjusted pvalues for incr arr", function(){
    var adjPvalues = fdr([0.1,0.2,0.4,0.5]);
    expect(adjPvalues).to.be.clsTo([0.4,0.4,0.5,0.5], 0.01);
  });
  it("correctly calculates adjusted pvalues for decr arr", function(){
    var adjPvalues = fdr([0.4,0.3,0.2,0.1]);
    expect(adjPvalues).to.be.clsTo([0.4, 0.4, 0.4, 0.4], 0.01);
  });
});

describe("bonferroni()", function(){
  it("correctly calculates adjusted pvalues for arr", function(){
    var adjPvalues = bonferroni([0.1,0.2,0.05,0.4,0.01]);
    expect(adjPvalues).to.be.clsTo([0.50, 1.00, 0.25, 1.00, 0.05], 0.01);
  });
});

describe("BY()", function(){
  it("correctly calculates adjusted pvalues for arr", function(){
    var adjPvalues = bY([0.1,0.2,0.05,0.4,0.01]);
    expect(adjPvalues).to.be.clsTo([0.380, 0.57, 0.285, 0.913, 0.114], 0.01);
  });
  it("correctly calculates adjusted pvalues for incr arr", function(){
    var adjPvalues = bY([0.1,0.2,0.4,0.5]);
    expect(adjPvalues).to.be.clsTo([0.833, 0.833, 1, 1], 0.01);
  });
  it("correctly calculates adjusted pvalues for decr arr", function(){
    var adjPvalues = bY([0.4,0.3,0.2,0.1]);
    expect(adjPvalues).to.be.clsTo([0.833, 0.833, 0.833, 0.833], 0.01);
  });
});
