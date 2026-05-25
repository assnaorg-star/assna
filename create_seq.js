const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(`CREATE SEQUENCE IF NOT EXISTS events_id_seq START 1;`);
    console.log('Sequence created or already exists.');
  } catch (error) {
    console.error('Error creating sequence:', error);
  } finally {
    await prisma.$disconnect();
  }
}
main();
