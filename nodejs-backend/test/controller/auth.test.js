const {app, server} = require('../../index');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const {db, closeDB} = require('../../service/db');
const {JWT_SECRET_KEY} = require('../../config/keys');
const {BASE_PATH} = require("../../const/const");

jest.mock('../../service/db', () => ({
    db: jest.fn().mockResolvedValue({
        query: jest.fn().mockResolvedValue([[{
            id: 1,
            username: 'testuser',
            password: '$2a$10$wpbOlcZGR9X/qrJ209VmKey6z55oZd6KTynkuHs6csMLTQOKPg5Oi'
        }], []])
    }),
    closeDB: jest.fn()
}));

describe('Auth Controller - Login', () => {

    describe('Login with correct details', () => {
        it('should return a 200 status and JWT token for valid credentials', async () => {
            const response = await request(app)
                .post(`${BASE_PATH}/auth/login`)
                .send({username: 'testuser', password: '1234'});

            expect(response.statusCode).toBe(200);
            expect(response.body.data).toHaveProperty('access_token');
            expect(jwt.verify(response.body.data.access_token, JWT_SECRET_KEY)).toBeTruthy();
        });
    })

    describe('Login with invalid password', () => {
        it('should return a 404 status for invalid password', async () => {
            const response = await request(app)
                .post(`${BASE_PATH}/auth/login`)
                .send({username: 'testuser', password: 'wrongpassword'});

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('invalid password');
        });
    })

    describe('Login with invalid username', () => {
        it('should return a 404 status for invalid username', async () => {
            require('../../service/db').db.mockImplementation(() => Promise.resolve({
                query: () => Promise.resolve([[], []])
            }));
            const response = await request(app)
                .post(`${BASE_PATH}/auth/login`)
                .send({username: 'wronguser', password: '1234'});

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('user not found');
        });
    })

    afterAll(async () => {
        await server.close();
        await closeDB();
    }, 30000);
});

