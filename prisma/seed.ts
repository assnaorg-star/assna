import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.event.deleteMany();

  const events = [
    {
      date: new Date('2026-06-15T14:00:00Z'),
      speaker: 'Dr. Jane Smith',
      affiliation: 'MIT',
      talkTitle: 'Future of Agentic AI',
      type: 'Seminar',
      recordingUrl: 'https://youtube.com/example1',
      isUpcoming: true,
    },
    {
      date: new Date('2026-05-20T10:00:00Z'),
      speaker: 'Prof. Alan Turing',
      affiliation: 'Cambridge',
      talkTitle: 'Computing Machinery and Intelligence',
      type: 'Workshop',
      isUpcoming: true,
    },
    {
      date: new Date('2026-04-10T16:00:00Z'),
      speaker: 'Grace Hopper',
      affiliation: 'Yale University',
      talkTitle: 'Standardization of Programming Languages',
      type: 'Panel',
      recordingUrl: 'https://youtube.com/example2',
      isUpcoming: false,
    },
  ];

  for (const event of events) {
    const createdEvent = await prisma.event.create({
      data: event,
    });
    console.log(`Created event with id: ${createdEvent.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
