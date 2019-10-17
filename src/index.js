import dotenv from 'dotenv';
import createApp from './app.js'; // node experimental module loader needs file ext?!

// load configuration
dotenv.config();
const { PORT } = process.env;

// run app
const app = createApp();
const port = PORT || 3000;
app.listen(port);
console.log(`listening on port ${port}`);
