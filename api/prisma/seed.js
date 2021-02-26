const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const aliceRecord = {
    where: { id: 1 },
    update: {},
    create: {
      name: 'Alice S.',
      group: 'USER',
      state: 'ACTIVE',
    },
  }

  const bobRecord = {
    where: { id: 2 },
    update: {},
    create: {
      name: 'Bob D.',
      group: 'MARKETING',
      state: 'ACTIVE',
    },
  }

  const alexRecord = {
    where: { id: 3 },
    update: {},
    create: {
      name: 'Alex J.',
      group: 'ENGINEERING',
      state: 'INACTIVE',
    },
  }

  const alice = await prisma.user.upsert(aliceRecord)
  const bob = await prisma.user.upsert(bobRecord)
  const alex = await prisma.user.upsert(alexRecord)

  console.log({ alice, bob, alex })
}

main()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
