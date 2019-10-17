import dotenv from 'dotenv';
import app from './app';

// load configuration
dotenv.config();
const { PORT } = process.env;

// run app
const port = PORT || 3000;
app.listen(port);
console.log(`listening on port ${port}`);

