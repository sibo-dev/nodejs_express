const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    username: 'wndy',
    firstName: 'Wendy',
    lastName: 'Lazy',
    email: 'wendy@gmail.com',
    Rating: {
      create: [
        {
          rating: 5,
          comment: 'Very good',
          cleanersId: 1,
        },
      ],
    },  
  },
  {
    username: 'bob',
    firstName: 'Bob',
    lastName: 'FakeName',
    email: 'bob@gmail.com',
    Booking: {
      create: [
        {
          date: '2024-03-14T23:00:17.797Z',
          cleaners: {
            connect: {
              id: 1,
            },
          },
          // user: {
          //   connect: {
          //     id: 2,
          //   },
          // },
        },
      ],
    },
  },
]

const cleanerData = [
  {
    name: 'mamAlice',
    email: 'alice@catalyzu.com',
    price: 150,
    
  },
]

const bookingData = [
  {
    date: '2024-03-19T13:00:17.797Z',
    amountDue: 150,
    user: {
      connect: {
        id: 1,
      },
    },
    cleaners: {
      connect: {
        id: 1,
      }
    },
  },
 ]
 

async function main() {
  console.log(`Start seeding ...`)
  for (const c of cleanerData) {
    const cleaner = await prisma.cleaners.create({
      data: c,
    })
    console.log(`Created cleaner with id: ${cleaner.id}`)
  }
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const b of bookingData) {
    const booking = await prisma.booking.create({
      data: b,
    })
    console.log(`Created booking with id: ${booking.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
