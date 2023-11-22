const supertest = require('supertest');
const { app } = require('../api/server.ts')
const baseURL = 'http://localhost:8080'

describe('auth', () => {
    let token = "";
    beforeAll( async () => {
        const user = "admin@example.com";
        const pass = "pass";
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = await fetch(`${baseURL}/auth`, {
            method: 'Post',
            headers: headers,
            body: JSON.stringify({'user': user, 'pass': pass}),
        });
        let json = response.json();
        console.log("JSON : ", json);
        token = json['accessToken'];
        console.log("TOKEN ", token);
    });

    describe('login route', () => {
        describe('given login was successful', () => {
            it('should return 200', async () => {
                const user = "admin@example.com";
                const pass = "password";
                supertest(baseURL)
                .post('/auth')
                .send({
                    'user': user,
                    'pass': pass
                });
            });
        });
    });
    describe('logout route', () => {
        describe('given successful logout', () => {
            it('should return 200', async () => {
                supertest(baseURL)
                .get('/logout')
                .set('Cookie', [
                    `jwt=${token}`,
                ])
                .send({});
            });
        });
    })
});