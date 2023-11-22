const supertest = require('supertest');
const { app } = require('../api/server.ts')
const dbConnect = require('../api/config/dbConnect.ts');

describe('dbConnect', () => {
    describe('MongoDB Connection', () => {
        describe('given connection was successful', () => {
            it('should return 2', async () => {
                const readyState = await dbConnect();
                expect(readyState).toBe(2);
            });
        });
    });
});