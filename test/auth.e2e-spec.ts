import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module'; // Adjust the import path as per your application structure
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserDTO } from '../src/users/models/userDTO';
import { AuthDTO } from '../src/users/models/authDTO';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/auth/registration (POST)', async () => {
        const userDto = {
            "id": 5,
            "fullName": "Test",
            "email": "test@gmail.com",
            "password": "test",
            "role": "admin"
        };

        const response = await request(app.getHttpServer())
            .post('/auth/registration')
            .send(userDto)
            .expect(201); // Adjust the expected status code as per your implementation

        expect(response.body).toHaveProperty('id', 5);
    });

    it('/auth/login (POST)', async () => {
        const authDto: AuthDTO = {
            "email": "test@gmail.com",
            "password": "test"
        };

        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send(authDto)
            .expect(201); // Adjust the expected status code as per your implementation
        console.log(response.body)
        expect(response.body).toHaveProperty('token'); // Assuming the response contains an 'accessToken' property
        // Add more assertions based on your implementation and the response format
    });

    it('/users/5 (DELETE)', async () => {

        const response = await request(app.getHttpServer())
            .delete('/users/5')
            .expect(200);
        expect(response.body)

    });
});
