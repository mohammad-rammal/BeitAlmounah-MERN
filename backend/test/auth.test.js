const request = require('supertest');
const assert = require('assert');
const app = require('../app'); // Assuming your Express app instance is exported from app.js

describe('Authentication API', function () {
    // Test for registering a new user
    describe('POST /api/auth/register', function () {
        it('should register a new user', function (done) {
            request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test@example.com',
                    username: 'testuser',
                    password: 'testpassword'
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    assert.strictEqual(res.body.email, 'test@example.com');
                    assert.strictEqual(res.body.username, 'testuser');
                    // You can add more assertions based on your response structure
                    done();
                });
        });

        it('should return validation error for invalid data', function (done) {
            request(app)
                .post('/api/auth/register')
                .send({
                    // Invalid data with missing required fields
                    // You can adjust this based on your validation schema
                })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    assert.strictEqual(res.body.message, 'Validation error message');
                    done();
                });
        });
    });

    // Test for logging in a user
    describe('POST /api/auth/login', function () {
        it('should login a user', function (done) {
            request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'testpassword'
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    assert.strictEqual(res.body.email, 'test@example.com');
                    // You can add more assertions based on your response structure
                    done();
                });
        });

        it('should return error for invalid credentials', function (done) {
            request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword'
                })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    assert.strictEqual(res.body.message, 'Invalid email or password');
                    done();
                });
        });
    });
});
