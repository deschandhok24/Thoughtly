import prisma from './index.js';
// Note: This script assumes you have a model defined in your schema.prisma,
// for example, a 'User' model, which is common. If you get a model error,
// you can replace 'prisma.user.count()' with 'prisma.$queryRaw`SELECT 1`'
// for a basic raw connection check.
/**
 * Tests the connection to the database by attempting a simple query.
 */
async function testPrismaConnection() {
    console.log("--- Starting Database Connection Test ---");
    try {
        // Attempt a basic query. Counting users is a low-impact way to check
        // if the connection is active and models are synced.
        // If you haven't run 'npx prisma migrate dev' yet, this will fail
        // and prompt you to run it.
        const count = await prisma.ticket.count();
        console.log(`\n✅ SUCCESS! Connection is active.`);
        console.log(`Database is reachable and the 'User' model is ready. Current user count: ${count}`);
    }
    catch (error) {
        console.error("\n❌ FAILED to connect or query database!");
        console.error("Please check the following steps:");
        console.error("1. Database Server: Ensure your PostgreSQL/MySQL/SQLite server is running.");
        console.error("2. .env File: Verify your DATABASE_URL is set correctly in your .env file.");
        console.error("3. Schema Sync: Run 'npx prisma generate' and 'npx prisma migrate dev' to sync your schema.");
        console.error("\nDetailed Error:");
    }
    finally {
        // It's crucial to always disconnect the client pool after the operation
        await prisma.$disconnect();
        console.log("\n--- Prisma Client Disconnected ---");
    }
}
testPrismaConnection();
//# sourceMappingURL=test.js.map