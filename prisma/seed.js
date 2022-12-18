const prisma = require('../src/lib/prisma');
const users = require('./seeders/users');

async function seed() {
  // seed users collection
  await Promise.all((await users).map(((user) => prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: user,
  }))));
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
