// server/routes/events.js
import express from 'express';
import { getAllEvents } from '../db/events.js';
import { z } from 'zod';
const router = express.Router();
const querySchema = z.object({
    page: z.string().transform(Number),
    limit: z.string().transform(Number),
    startDate: z.date().optional(),
});
router.get('/', async (req, res) => {
    try {
        const { page, limit, startDate } = querySchema.parse(req.query);
        const events = await getAllEvents(page, limit, startDate);
        res.json({ events });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: 'Invalid request', details: err.errors });
        }
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
export default router;
//# sourceMappingURL=events.js.map