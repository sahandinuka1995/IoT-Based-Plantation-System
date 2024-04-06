const request = require('supertest');
const {app, server} = require('../../index');
const {BASE_PATH} = require("../../const/const");
const {closeDB} = require("../../service/db");

describe('User API Tests', () => {
    let userId = 0

    describe('POST /create', () => {
        it('should create a new user', async () => {
            const userData = {
                name: 'John Doe',
                role: 'ADMIN',
                username: 'johndoe',
                password: 'password123'
            };

            const response = await request(app)
                .post(`${BASE_PATH}/user/create`)
                .send(userData);

            // assign created user id for other api uses
            userId = response.body.data.insertId

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Operation Successfully');
        });
    });

    describe('PUT /update/:id', () => {
        it('should update an existing user', async () => {
            const updatedData = {
                name: 'Jane Doe',
                role: 'USER',
                username: 'janedoe',
                password: 'newpassword123'
            };

            const response = await request(app)
                .put(`${BASE_PATH}/user/update/${userId}`)
                .send(updatedData);

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Operation Successfully');
        });
    });

    describe('GET /get-all', () => {
        it('should retrieve all users', async () => {
            const response = await request(app)
                .get(`${BASE_PATH}/user/get-all`);

            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('DELETE /delete/:id', () => {
        it('should delete an existing user', async () => {
            const response = await request(app)
                .delete(`${BASE_PATH}/user/delete/${userId}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Operation Successfully');
        });
    });

    afterAll(async () => {
        await server.close();
        await closeDB();
    }, 30000);
});
