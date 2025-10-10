import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';

dotenv.config();

// Create the Express app
const app = express();
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'http://localhost:5174',
            'https://reviews.jeffolivier.com',
        ],
    })
);
app.use(express.json());
app.use(router);

// Recommended extras when you're behind NGINX/DO
app.set('trust proxy', 1); // so req.ip, secure cookies, etc. work behind a proxy

// Initialize host/port from env (sane defaults for dev)
const HOST = process.env.HOST ?? '0.0.0.0'; // bind all interfaces on the droplet
const PORT = Number(process.env.PORT ?? 3002);
const PUBLIC_URL = process.env.PUBLIC_URL;

app.listen(PORT, HOST, () => {
    const mode = process.env.NODE_ENV ?? 'development';

    // Local convenience URL for laptops; on droplets, rely on PUBLIC_URL
    const localHint =
        HOST === '0.0.0.0'
            ? `http://localhost:${PORT}`
            : `http://${HOST}:${PORT}`;

    console.log(
        `[review summarizer] mode=${mode} listening on ${HOST}:${PORT}`
    );
    if (PUBLIC_URL) {
        console.log(`[review summarizer] public URL: ${PUBLIC_URL}`);
    } else {
        console.log(`[review summarizer] dev hint: ${localHint}`);
    }
});
