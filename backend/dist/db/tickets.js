// db/tickets.ts
import prisma from './index.js';
import { TicketStatus } from '@prisma/client';
/**
 * Get tickets for a specific event by tier
 */
export const getAvailableTickets = async (eventId) => {
    const ticketsPerTier = await prisma.ticket.groupBy({
        by: ["tier"],
        where: { eventId, status: TicketStatus.available },
        _count: { id: true },
    });
    const result = {
        VIP: 0,
        FrontRow: 0,
        GA: 0,
    };
    ticketsPerTier.forEach((t) => {
        result[t.tier] = t._count.id;
    });
    return result;
};
/**
 * Get all available tickets for a specific event, section, and tier
 */
export const bookTickets = async ({ eventId, VIP, FrontRow, GA, }) => {
    return await prisma.$transaction(async (tx) => {
        const bookedTickets = await tx.$queryRaw `
      (
        SELECT id, tier FROM "Ticket"
        WHERE "eventId" = ${eventId} AND "tier" = 'VIP' AND "status" = ${TicketStatus.available}
        LIMIT ${VIP}
        FOR UPDATE SKIP LOCKED
      )
      UNION ALL
      (
        SELECT id, tier FROM "Ticket"
        WHERE "eventId" = ${eventId} AND "tier" = 'FrontRow' AND "status" = ${TicketStatus.available}
        LIMIT ${FrontRow}
        FOR UPDATE SKIP LOCKED
      )
      UNION ALL
      (
        SELECT id, tier FROM "Ticket"
        WHERE "eventId" = ${eventId} AND "tier" = 'GA' AND "status" = ${TicketStatus.available}
        LIMIT ${GA}
        FOR UPDATE SKIP LOCKED
      );
    `;
        const totalRequested = VIP + FrontRow + GA;
        if (bookedTickets.length < totalRequested) {
            return { success: false, tickets: 0 }; // Not enough tickets
        }
        // Update tickets to sold
        const ids = bookedTickets.map((t) => t.id);
        await tx.ticket.updateMany({
            where: { id: { in: ids } },
            data: { status: TicketStatus.sold },
        });
        return { success: true, tickets: totalRequested };
    });
};
//# sourceMappingURL=tickets.js.map