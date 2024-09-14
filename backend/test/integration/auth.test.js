const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app'); 
/*
Registration : Email , password

tests:
1) all fields are required 
2) password must be more than 8 chars
3) register user Done

*/



chai.use(chaiHttp);
const expect = chai.expect;

describe('register', () => {
    it('should return 400 if any field is missing', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/register')
            .send({}); // Send an empty object to simulate missing fields

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Validation error message');
    });

    it('should return 400 if password < 8 chars', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'short', // Set a short password
            });

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Password length should be at least 8 characters');
    });

    it('should return 201 and register user', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'strongpassword',
            });

        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        // Add more assertions if needed
    });
});
