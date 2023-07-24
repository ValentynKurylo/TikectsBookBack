import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module'; // Assuming your AppModule is defined in this file
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {AuthDTO} from "../src/users/models/authDTO";

describe('SeatsController (e2e)', () => {
    let app: INestApplication;
    let token: string;
    let current_id: number

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST)', async () => {
        const authDto: AuthDTO = {
            "email": "Kurylo@gmail.com",
            "password": "1111"
        };

        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send(authDto)
            .expect(201); // Adjust the expected status code as per your implementation
        expect(response.body).toHaveProperty('token'); // Assuming the response contains an 'accessToken' property
        token = response.body.token
    });

    afterAll(async () => {
        await app.close();
    });

    it('/seats (POST)', async () => {
        const seatDto = {
            "name": 1,
            "rowId": 2
        };

        const response = await request(app.getHttpServer())
            .post('/seats')
            .send(seatDto)
            .set('Authorization', `Bearer ${token}`)
            .expect(201);

        expect(response.body);
        current_id = response.body?.id
    });
    it('/seats (POST)', async () => {
        const seatDto = {
            "name": 1,
            "rowId": 2
        };

        const response = await request(app.getHttpServer())
            .post('/seats')
            .send(seatDto)
            .set('Authorization', `Bearer uiuii`)
            .expect(401);

        expect(response);
    });
    it('/seats (GET)', async () => {

        const response = await request(app.getHttpServer())
            .get('/seats')
            .expect(200);

        expect(response.body);
    });
    it(`/seats/${current_id} (GET)`, async () => {

        const response = await request(app.getHttpServer())
            .get(`/seats/${current_id}`)
            .expect(200);

        expect(response.body);
    });
    it(`/seats/${current_id} (PUT)`, async () => {
        const seatDto = {
            "name": 6,
            "rowId": 2
        };

        const response = await request(app.getHttpServer())
            .put(`/seats/${current_id}`)
            .send(seatDto)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body);
    });
    it(`/seats/${current_id} (PUT)`, async () => {
        const seatDto = {
            "name": 8,
            "rowId": 2
        };
        const response = await request(app.getHttpServer())
            .put(`/seats/${current_id}`)
            .send(seatDto)
            .set('Authorization', `Bearer ${''}`)
            .expect(401);

        expect(response);
    });
    it(`/seats/${current_id} (DELETE)`, async () => {

        const response = await request(app.getHttpServer())
            .delete(`/seats/${current_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body)
    });

});