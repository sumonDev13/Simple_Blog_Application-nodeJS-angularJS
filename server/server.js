import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';

import blogRoutes from './routes/blogRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { initializeStore } from './models/blogStore.js';



const app = express();
const port = 3000;


const corsOption = {
    origin: ['http://localhost:4200'],
};
app.use(cors(corsOption));

app.use(bodyParser.json());

app.use('/api/posts', blogRoutes);

app.use(errorHandler);

initializeStore();

// Start the server
app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});