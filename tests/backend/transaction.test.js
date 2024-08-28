const request = require('supertest');
const app = require('../../backend/app');
const db = require('../../backend/config/db');

describe('Transaction API', () => {
    let token;
    let transaction_id;

    beforeAll(async () => {
        // Sign up and log in to get a token
        await request(app).post('/api/auth/signup').send({ username: 'testuser', password: 'testpass' });
        const res = await request(app).post('/api/auth/login').send({ username: 'testuser', password: 'testpass' });
        token = res.body.token;
    });

    afterAll(async () => {
        await db.query('DELETE FROM transactions');
        await db.query('DELETE FROM users');
    });

    test('Create a new transaction', async () => {
        const res = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({ crypto_id: 1, amount: 10, transaction_type: 'buy', price_at_transaction: 50000 });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('Transaction created successfully');
    });

    test('Get transactions', async () => {
        const res = await request(app)
            .get('/api/transactions')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
        transaction_id = res.body[0].transaction_id;
    });

    test('Update a transaction', async () => {
        const res = await request(app)
            .put('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({ transaction_id, amount: 5, transaction_type: 'sell', price_at_transaction: 51000 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Transaction updated successfully');
    });

    test('Delete a transaction', async () => {
        const res = await request(app)
            .delete('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({ transaction_id });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Transaction deleted successfully');
    });
});
