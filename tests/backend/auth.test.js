const assert = require('assert');
const request = require('supertest');
const app = require('../../backend/index');
const User = require('../../backend/models/User');
const db = require('../../backend/config/db');

describe('Auth API', () => {
  before(async function() {
    this.timeout(5000);
    try {
      await db.promise().execute('DELETE FROM users');
      console.log('Users table cleared');
    } catch (error) {
      console.error('Error clearing users table:', error);
      throw error;
    }
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', (done) => {
      const uniqueEmail = `newuser${Date.now()}@example.com`;
      request(app)
        .post('/api/auth/register')
        .send({
          username: `newuser${Date.now()}`,
          email: uniqueEmail,
          password: 'password123'
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          console.log('Registration response:', res.body);
          assert(res.body.token, 'Response should have a token');
          assert(res.body.user, 'Response should have a user object');
          assert.strictEqual(res.body.user.email, uniqueEmail, 'User email should match');
          done();
        });
    });
  });

  describe('POST /api/auth/login', () => {
    let testUser;

    before(async function() {
      this.timeout(5000);
      testUser = {
        username: `testuser${Date.now()}`,
        email: `testuser${Date.now()}@example.com`,
        password: 'password123'
      };
      
      await request(app)
        .post('/api/auth/register')
        .send(testUser);
    });

    it('should login an existing user', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          console.log('Login response:', res.body);
          assert(res.body.token, 'Response should have a token');
          assert(res.body.user, 'Response should have a user object');
          assert.strictEqual(res.body.user.email, testUser.email, 'User email should match');
          done();
        });
    });
  });
});
