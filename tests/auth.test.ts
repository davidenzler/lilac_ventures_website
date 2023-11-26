const supertest = require('supertest');
const { app } = require('../api/server.ts')
const baseURL = 'http://localhost:8080'

describe('auth', () => {
    describe('login route', () => {
        describe('given logging in w/ valid user & pass', () => {
            it('should return 200', async () => {
                const user = "admin@example.com";
                const pass = "password";
                supertest(baseURL)
                .post('/auth')
                .send({
                    'user': user,
                    'pass': pass
                })
                .expect(200);
            });
        });
        describe('given logging in w/ invalid user & pass', () => {
            it('should return 401', async () => {
                const user = "admin@example.com";
                const pass = "notthepassword";
                supertest(baseURL)
                .post('/auth')
                .send({
                    'user': user,
                    'pass': pass
                })
                .expect(401);
            });
        });
    });
    
});