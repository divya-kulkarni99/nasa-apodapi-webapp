// NASA APOD API Backend - Updated CORS for production
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./userinformation');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const apodRoutes = require('./routes/apod');

// database connection
connection().catch((err) => console.error('Database connection error:', err));

const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ||
  'http://localhost:3000,http://127.0.0.1:3000'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Fix Cross-Origin-Opener-Policy to allow Google OAuth popups
// Only set in production; in development, we skip it to avoid issues
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  }
  next();
});

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'), false);
    },
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (req, res) => {
  res.json('Hello');
});

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/apod', apodRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
