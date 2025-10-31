/**
 * Get tickets for a specific event by tier
 */
export declare const getAvailableTickets: (eventId: string) => Promise<Record<import("@prisma/client").$Enums.TicketTier, number>>;
/**
 * Get all available tickets for a specific event, section, and tier
 */
export declare const bookTickets: ({ eventId, VIP, FrontRow, GA, }: {
    eventId: string;
    VIP: number;
    FrontRow: number;
    GA: number;
}) => Promise<{
    success: boolean;
    tickets: number;
}>;
