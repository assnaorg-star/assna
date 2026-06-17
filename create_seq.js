const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(`CREATE SEQUENCE IF NOT EXISTS events_id_seq START 1;`);
    await prisma.$executeRawUnsafe(`CREATE SEQUENCE IF NOT EXISTS members_id_seq START 1;`);
    console.log('Sequences created or already exist.');
  } catch (error) {
    console.error('Error creating sequence:', error);
  } finally {
    await prisma.$disconnect();
  }
}
main();
