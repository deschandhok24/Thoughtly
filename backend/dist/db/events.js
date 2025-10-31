import prisma from './index.js';
/**
 * Get all events, optionally filtered by start and end date
 * @param page page number (1-based)
 * @param limit number of items per page
 * @param startDate optional
 */
export const getAllEvents = async (page, limit, startDate) => {
    const where = {};
    if (startDate) {
        where.date = {};
        if (startDate)
            where.date.gte = startDate;
    }
    const skip = (page - 1) * limit;
    return prisma.event.findMany({
        where,
        include: {
            venue: { select: { id: true, name: true } },
        },
        orderBy: { date: 'asc' },
        skip,
        take: limit,
    });
};
//# sourceMappingURL=events.js.map