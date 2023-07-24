import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module'; // Assuming your AppModule is defined in this file
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {AuthDTO} from "../src/users/models/authDTO";
const token = ''
describe('EventsController (e2e)', () => {
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

    it('/events (POST)', async () => {
        const eventDto = {
            "name": 'test-event',
            "date": '2024-01-02T00:00:00.000Z',
            'place': 'test',
            'description': 'test'
        };

        const response = await request(app.getHttpServer())
            .post('/events')
            .send(eventDto)
            .set('Authorization', `Bearer ${token}`)
            .expect(201);

        expect(response.body);
        current_id = response.body?.id
    });
    it('/events (POST)', async () => {
        const eventDto = {
            "name": 'test-event',
            "date": '2024-01-02T00:00:00.000Z',
            'place': 'test',
            'description': 'test'
        };

        const response = await request(app.getHttpServer())
            .post('/events')
            .send(eventDto)
            .set('Authorization', `Bearer uiuii`)
            .expect(401);

        expect(response);
    });
    it('/events (GET)', async () => {

        const response = await request(app.getHttpServer())
            .get('/events')
            .expect(200);

        expect(response.body);
    });
    it(`/events/${current_id} (GET)`, async () => {

        const response = await request(app.getHttpServer())
            .get(`/events/${current_id}`)
            .expect(200);

        expect(response.body);
    });
    it(`/events/${current_id} (PUT)`, async () => {
        const eventDto = {
            "name": 'test-event1',
            "date": '2024-01-02T00:00:00.000Z',
            'place': 'test',
            'description': 'test'
        };

        const response = await request(app.getHttpServer())
            .put(`/events/${current_id}`)
            .send(eventDto)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body);
    });
    it(`/events/${current_id} (PUT)`, async () => {
        const eventDto = {
            "name": 'test-event2',
            "date": '2024-01-02T00:00:00.000Z',
            'place': 'test',
            'description': 'test'
        };

        const response = await request(app.getHttpServer())
            .put(`/events/${current_id}`)
            .send(eventDto)
            .set('Authorization', `Bearer ${''}`)
            .expect(401);

        expect(response);
    });
    it(`/events/${current_id} (DELETE)`, async () => {

        const response = await request(app.getHttpServer())
            .delete(`/events/${current_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body)
    });

});