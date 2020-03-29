const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('NGO', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('shoud be able to create a new NGO', async () => {
        const response = await request(app)
            .post('/ngos')
            .send({
                name: 'APAD Teste',
                email: 'contato@APAD.com',
                whatsapp: '27998950411',
                city: 'Vitória',
                state: 'ES'
            });

        expect(response.body).toHaveProperty('Id');
        expect(response.body.Id).toHaveLength(8);
    })
});