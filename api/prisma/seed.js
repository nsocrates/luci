const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const aliceRecord = {
    where: { id: 1 },
    update: {},
    create: {
      name: 'Alice',
      group: 'USER',
      state: 'ACTIVE',
    },
  }

  const bobRecord = {
    where: { id: 2 },
    update: {},
    create: {
      name: 'Bob',
      group: 'MARKETING',
      state: 'ACTIVE',
    },
  }

  const lucyRecord = {
    where: { id: 3 },
    update: {},
    create: {
      name: 'Lucy',
      group: 'ENGINEERING',
      state: 'INACTIVE',
    },
  }

  const alexRecord = {
    where: { id: 4 },
    update: {},
    create: {
      name: 'Alex',
      group: 'MARKETING',
      state: 'INACTIVE',
    },
  }

  const alice = await prisma.user.upsert(aliceRecord)
  const bob = await prisma.user.upsert(bobRecord)
  const lucy = await prisma.user.upsert(lucyRecord)
  const alex = await prisma.user.upsert(alexRecord)

  console.log({ alice, bob, lucy, alex })
}

main()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
