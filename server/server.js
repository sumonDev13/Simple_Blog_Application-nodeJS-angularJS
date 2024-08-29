import express from 'express';
import bodyParser from 'body-parser'

import blogRoutes from './routes/blogRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api/posts', blogRoutes);

app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});