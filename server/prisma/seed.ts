import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const NUMBER_OF_ITEMS = 200;

async function run() {
  await prisma.user.deleteMany();

  const users = [];

  for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
    users.push(
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          age: Math.floor(Math.random() * 100),
          city: faker.location.city(),
        },
      }),
    );
  }

  await Promise.all(users);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  });
