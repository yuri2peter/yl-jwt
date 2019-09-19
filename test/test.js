const assert = require('assert');
const { jwtResolve, jwtGenerate } = require('../index');

it("should verifyied in 1s", function()
{
  const data = 'test1';
  const cert = 'key1';
  const expire = 2;
  const jwt = jwtGenerate(data, cert, expire);
  const rel = jwtResolve(jwt, cert);
  setTimeout(() => {
    assert.equal(rel, data);
  }, 1000)
});

it("should expired in 3s", function(done)
{
  this.timeout(5000);
  const data = 'test2';
  const cert = 'key2';
  const expire = 2;
  const jwt = jwtGenerate(data, cert, expire);
  setTimeout(() => {
    try {
      const rel = jwtResolve(jwt, cert);
      assert.equal(rel, null);
      done();
    } catch (e) {
      done(e);
    }
  }, 3000)
});

it("should failed with wrong cert", function(done)
{
  this.timeout(5000);
  const data = 'test3';
  const cert = 'key3';
  const expire = 1;
  const jwt = jwtGenerate(data, cert, expire);
  setTimeout(() => {
    try {
      const rel = jwtResolve(jwt, 'wrong cert');
      assert.equal(rel, null);
      done();
    } catch (e) {
      done(e);
    }
  }, 1000)
});