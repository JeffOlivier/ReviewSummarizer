import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

// Create the Express app
const app = express();
app.use(express.json());
app.use(router);

// Initialize the server port
const port = process.env.PORT || 3002;

// Start the server (app)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
