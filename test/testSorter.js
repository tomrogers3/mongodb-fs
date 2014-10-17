var chai = require('chai')
  , sorter = require('../lib/sorter.js');

var orderby = {
  'owner.ord': 1,
  'owner.branchId': 1
};

var docs = [{
  "id": 1
}, {
  "id": 2,
  "owner": {
    "ord": 120,
    "branchId": "4321"
  }
}, {
  "id": 3,
  "owner": {
    "ord": 120,
    "branchId": "1234"
  }
}, {
  "id": 4,
  "owner": {
    "ord": 60,
    "branchId": "1234"
  }
}, {
  "id": 5,
  "owner": {
    "ord": 60
  }
}];

var expected = [{
  "id": 1
}, {
  "id": 5,
  "owner": {
    "ord": 60
  }
}, {
  "id": 4,
  "owner": {
    "ord": 60,
    "branchId": "1234"
  }
}, {
  "id": 3,
  "owner": {
    "ord": 120,
    "branchId": "1234"
  }
}, {
  "id": 2,
  "owner": {
    "ord": 120,
    "branchId": "4321"
  }
}];

describe("orderby", function() {
  var expect = chai.expect;
  var result = sorter.orderBy(docs, orderby);

  it("should be the correct length", function() {
    expect(result.length).to.equal(expected.length);
  });

  it("should be sorted correctly", function() {
    expect(result).to.deep.equal(expected);
  });
});

