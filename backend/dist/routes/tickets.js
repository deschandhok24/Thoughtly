import express from 'express';
import { bookTickets, getAvailableTickets } from '../db/tickets.js';
import { z } from 'zod';
import { TicketTier } from "@prisma/client";
const router = express.Router();
const bodySchema = z.object({
    tiers: z.object({
        [TicketTier.VIP]: z.number().int().positive(),
        [TicketTier.FrontRow]: z.number().int().positive(),
        [TicketTier.GA]: z.number().int().positive(),
    })
});
router.put('/:eventId/buy', async (req, res) => {
    try {
        const { eventId } = req.params;
        const { tiers } = bodySchema.parse(req.body); // { VIP: 2, GA: 3, FrontRow: 0 }
        const success = await bookTickets({ eventId, ...tiers });
        if (!success) {
            return res.status(409).json({ error: 'Not enough tickets available' });
        }
        res.json({ success: true });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: 'Invalid request', details: err.errors });
        }
        console.error(err);
        res.status(500).json({ error: 'Failed to process ticket purchase' });
    }
});
router.get('/:eventId/tickets', async (req, res) => {
    try {
        const { eventId } = req.params;
        const ticket_by_tier = getAvailableTickets(eventId);
        res.json(ticket_by_tier);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});
export default router;
//# sourceMappingURL=tickets.js.map