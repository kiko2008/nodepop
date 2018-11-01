const request = require('supertest');

require('dotenv').config();

const app = require('../app');

describe('Nodepop API tests', function(done) {

  var token = null;

  before(function(done) {
    request(app)
      .post('/loginJWT')
      .send({ email: 'user@example.com', password: '1234' })
      .end(function(err, res) {
        token = res.body.token;
        done();
      });
  });

  it('should return 200', function() {
    request(app)
      .get('/apiv1/products')
      .expect(200, done);
  })
});