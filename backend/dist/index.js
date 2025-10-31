import express from 'express';
import session from 'express-session';
import cors from 'cors';
const app = express();
// CORS configuration for React frontend
app.use(cors({
    origin: 'http://localhost:5173', // Update with your React dev server URL
    credentials: true, // Allow cookies to be sent
}));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true in production with HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        sameSite: 'lax',
    },
}));
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Other routes can be added here
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map