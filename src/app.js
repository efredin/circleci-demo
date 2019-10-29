import express from 'express';
import mongodb from 'mongodb';

const createApp = () => {
    const { CONNECTION_STRING, DATABASE } = process.env;

    // create express app
    const app = express();

    // add catch-all route
    app.use(async (request, response) => {
        try {
            // connect to database
            const client = await mongodb.MongoClient.connect(CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            const db = client.db(DATABASE);
            const counterCollection = db.collection('counter');

            // increment counter for current route
            const counter = await counterCollection.findOneAndUpdate(
                { 
                    route: request.path,
                    hello: 'intuit lunch & learn'
                },
                { $inc: { hits: 1 } },
                { upsert: true, returnOriginal: false }
            );

            response.json(counter.value);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error });
        }

        var test = false;
    });

    return app;
};

export default createApp;
