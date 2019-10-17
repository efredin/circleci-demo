import dotenv from 'dotenv';
import axios from 'axios';
import mongodb from 'mongodb';
import * as http from 'http';
import createApp from '../src/app';

describe('app', () => {
    dotenv.config({ path: './test/test.env' });
    const { PORT, CONNECTION_STRING, DATABASE } = process.env;

    const app = createApp();
    const server = http.createServer(app);
    const baseUrl = `http://localhost:${PORT}`;

    beforeAll(async () => {
        await server.listen(PORT);
    });

    afterAll(async () => {
        // connect to database
        const client = await mongodb.MongoClient.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db(DATABASE);
        const counterCollection = db.collection('counter');
        await counterCollection.drop();

        await client.close();
        await server.close();
    });

    it('creates counters for new routes', async () => {
        const response = await axios.get(baseUrl);
        expect(response.status).toEqual(200);
        expect(response.data).toMatchObject({
            route: '/',
            hits: 1
        });
    });

    it('increments counters for existing routes', async () => {
        await axios.get(`${baseUrl}/test`);
        const response = await axios.get(`${baseUrl}/test`);
        expect(response.status).toEqual(200);
        expect(response.data).toMatchObject({
            route: '/test',
            hits: 2
        });
    });
});
