let request = require('supertest');
const httpServer = require('./index.js');

describe('Api V1', () => {
    let app
    beforeAll(async () => {
        app = await httpServer;
        request = request(app);
    });

    it('exposes location', async () => {
        const response = await request
            .get('/api/v1/location')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72');

        expect(response.body).toEqual({ city: 'Avellaneda' });
    });

    it('should return weather when city is not provided', async () => {
        // Set an Avellaneda's ip address
        const response = await request
            .get('/api/v1/city')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72');

        expect(response.body.city).toEqual('Avellaneda');
        expect(response.body.country).toEqual('AR');
        expect(response.body.weather).toEqual({
            description: expect.any(String),
            temperature: expect.any(Number),
            min: expect.any(Number),
            max: expect.any(Number)
        });
    });

    it('should return weather for london', async () => {
        // Set an Avellaneda's ip address
        const response = await request
            .get('/api/v1/city/london')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72');
        expect(response.body.city).toEqual('London');
        expect(response.body.country).toEqual('GB');
        expect(response.body.weather).toEqual({
            description: expect.any(String),
            temperature: expect.any(Number),
            min: expect.any(Number),
            max: expect.any(Number)
        });
    });

    it('should forecast weather when city is not provided', async () => {
        const response = await request
            .get('/api/v1/forecast')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72');
        expect(response.body.city).toEqual('Avellaneda');
        expect(response.body.country).toEqual('AR');
        expect(response.body.list[0]).toEqual({
            description: expect.any(String),
            temperature: expect.any(Number),
            min: expect.any(Number),
            max: expect.any(Number)
        });
    });

    it('should forecast weather for london', async () => {
        const response = await request
            .get('/api/v1/forecast/london')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72');
        expect(response.body.city).toEqual('London');
        expect(response.body.country).toEqual('GB');
        expect(response.body.list[0]).toEqual({
            description: expect.any(String),
            temperature: expect.any(Number),
            min: expect.any(Number),
            max: expect.any(Number)
        });
    });

    it('should return 404 when city is not valid', async () => {
        const response = await request
            .get('/api/v1/forecast/invalid')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72');

        expect(response.status).toEqual(404);
        expect(response.body).toEqual({ message: 'City not found' });
    });

    afterAll(() => app.close());
});