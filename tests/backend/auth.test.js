const request = require('supertest');
const app = require('../../backend/index'); // Ensure your express app is exported

describe('Auth API', () => {
    describe('POST /api/auth/register', () => {
        it('should register a new user', (done) => {
            request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                })
                .expect(201)
                .expect((res) => {
                    res.body.should.have.property('token');
                    res.body.user.should.have.property('username', 'testuser');
                    res.body.user.should.have.property('email', 'test@example.com');
                    res.body.user.should.have.property('created_at');
                    res.body.user.should.have.property('updated_at');
                })
                .end(done);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login an existing user', (done) => {
            request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                })
                .expect(200)
                .expect((res) => {
                    res.body.should.have.property('token');
                    res.body.user.should.have.property('email', 'test@example.com');
                })
                .end(done);
        });
    });
});

