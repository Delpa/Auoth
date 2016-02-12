var auth = require('basic-auth');
var assert = require('assert');

module.exports = function(opts){
  opts = opts || {};

  assert(opts.name, 'basic auth .name required');
  assert(opts.pass, 'basic auth .pass required');

  return function *basicAuth(next){
    var user = auth(this);

    if (user && user.name == opts.name && user.pass == opts.pass) {
      yield next;
    } else {
      this.throw(401);
    }
  };
};