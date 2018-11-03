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

  it('GET product should return 200', function(done) {
    request(app)
      .get('/apiv1/products')
      .set('x-access-token', token)  
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('GET tags should return 200', function(done) {
    request(app)
      .get('/apiv1/tags')
      .set('x-access-token', token)  
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
 
  it('POST newProduct should return 200', function(done) {
    request(app)
      .post('/apiv1/newProduct')
      .set('x-access-token', token)  
      .attach('imagen', './public/flagsIcons/spain.png')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});