import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module'; // Assuming your AppModule is defined in this file
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {AuthDTO} from "../src/users/models/authDTO";

describe('SectionsController (e2e)', () => {
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

    it('/sections (POST)', async () => {
        const sectionDto = {
            "name": 'test-section',
            "price": 500,
            "eventId": 2
        };

        const response = await request(app.getHttpServer())
            .post('/sections')
            .send(sectionDto)
            .set('Authorization', `Bearer ${token}`)
            .expect(201);

        expect(response.body);
        current_id = response.body?.id
    });
    it('/sections (POST)', async () => {
        const sectionDto = {
            "name": 'test-section',
            "price": 500,
            "eventId": 2
        };


        const response = await request(app.getHttpServer())
            .post('/sections')
            .send(sectionDto)
            .set('Authorization', `Bearer uiuii`)
            .expect(401);

        expect(response);
    });
    it('/sections (GET)', async () => {

        const response = await request(app.getHttpServer())
            .get('/sections')
            .expect(200);

        expect(response.body);
    });
    it(`/sections/${current_id} (GET)`, async () => {

        const response = await request(app.getHttpServer())
            .get(`/sections/${current_id}`)
            .expect(200);

        expect(response.body);
    });
    it(`/sections/${current_id} (PUT)`, async () => {
        const sectionDto = {
            "name": 'test-section1',
            "price": 500,
            "eventId": 2
        };


        const response = await request(app.getHttpServer())
            .put(`/sections/${current_id}`)
            .send(sectionDto)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body);
    });
    it(`/sections/${current_id} (PUT)`, async () => {
        const sectionDto = {
            "name": 'test-section2',
            "price": 500,
            "eventId": 2
        };


        const response = await request(app.getHttpServer())
            .put(`/sections/${current_id}`)
            .send(sectionDto)
            .set('Authorization', `Bearer ${''}`)
            .expect(401);

        expect(response);
    });
    it(`/sections/${current_id} (DELETE)`, async () => {

        const response = await request(app.getHttpServer())
            .delete(`/sections/${current_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body)
    });

});