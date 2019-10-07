const request = require('request');
var chai = require("chai");

var existingIdPlayer = 102;
var unExistingIdPlayer = 140392;

describe("Testing tennis player stats services", () => {

  it('Should return all players and status code 200', function(done) {
    request.get(`http://localhost:8001/players` , function(error, response, body) {
      chai.expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Should test that tennis player sort is correctly based on their ids', function(done) {
    request.get(`http://localhost:8001/players` , function(error, response, body) {
      chai.expect(response.statusCode).to.equal(200);
      const result = JSON.parse(body);
      chai.expect(Array.isArray(result)).to.equal(true);

      const ids = [];

      result.forEach(player => {
        if (typeof player === "object" && player !== null) {
          ids.push(player.id);
        }
      });

      const minResult = Math.min(... ids);

      const index = ids.indexOf(minResult);

      chai.expect(index).to.equal(0);

      done();
    });
  });

  it('Should return one players associated to this id and status code 200', function(done) {
    request.get(`http://localhost:8001/players/${existingIdPlayer}` , function(error, response, body) {
      chai.expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Should return a 404 when there is no player with this id', function(done) {
    request.get(`http://localhost:8001/players/${unExistingIdPlayer}` , function(error, response, body) {
      chai.expect(response.statusCode).to.equal(404);
      done();
    });
  });

});
