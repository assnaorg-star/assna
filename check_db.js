const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const events = await prisma.event.findMany({ take: 5 });
    console.log('Current events:', JSON.stringify(events, null, 2));
  } catch (error) {
    console.error('Error fetching events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
