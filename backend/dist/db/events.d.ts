/**
 * Get all events, optionally filtered by start and end date
 * @param page page number (1-based)
 * @param limit number of items per page
 * @param startDate optional
 */
export declare const getAllEvents: (page: number, limit: number, startDate?: Date | null) => Promise<any[]>;
