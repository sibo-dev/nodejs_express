const express = require('express');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const router = express.Router();

function generateAccessToken(secret) {
  return jwt.sign(secret, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.get('/', (req, res) => {
  res.send('Good luck!')
})

// GET REQUESTS
// Allow users to request for available cleaners
router.get('/booking', async (req, res) => {
  try {
    const data = await prisma.booking.findMany({
      select: {
        id: true,
        date: true,
        amountDue: true,
        userId: true,
        cleanersId: true,
      },
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Get /booking/:id - Retrieve booking by ID
router.get('/booking/:id', async (req, res) => {
  try {
    const data = await prisma.booking.findMany({
      where: { cleanersId: Number(req.params.id) },
      select: {
        id: true,
        date: true,
        amountDue: true,
        userId: true,
      },
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

//Get /users - Retrieve all users
router.get('/users', async (req, res) => {
  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    })
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}
);

// GET /data/:id - Retrieve data by ID
router.get('/users/:id', async (req, res) => {
  try {
    const data = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// GET /data/cleaners - Retrieve all users that are cleaners
router.get('/cleaners', async (req, res) => {
  try {
    const data = await prisma.cleaners.findMany({
    })
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}
);

// GET /data/:id - Retrieve data by unique Cleaner ID
router.get('/cleaners/:id', async (req, res) => {
  try {
    const data = await prisma.cleaners.findUnique({
      where: { id: Number(req.params.id) },
      select: {
        id: true,
        name: true,
        email: true,
        price: true,
        rating: true,
      },
    });
    if (data) {
      res.json(data);
    }
    else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// GET /ratings - Retrieve all ratings
router.get('/ratings', async (req, res) => {
  try {
    const data = await prisma.rating.findMany({
      select: {
        id: true,
        rating: true,
        comment: true,
        cleanersId: true,
        userId: true,
        createdAt: true,
      },
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// GET /ratings/:id - Retrieve rating data by unique Cleaner ID
router.get('/ratings/:id', async (req, res) => {
  try {
    const data = await prisma.rating.aggregate({
      where: { cleanersId: Number(req.params.id) },
      _avg: {
        rating: true,
      },
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}
);

//Get /tasks/open - Retrieve all open tasks
router.get('/tasks/:id/open',verifyToken, async (req, res) => {
  try {
    
    const data = await prisma.tasks.findMany({
      where: { 
        cleanersId: {
          equals: Number(req.params.id)
        },
        done: false
        },
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

//Get /tasks/closed - Retrieve all completed tasks
router.get('/tasks/:id/closed', verifyToken, async (req, res) => {
  try {
    
    const data = await prisma.tasks.findMany({
      where: { 
        cleanersId: {
          equals: Number(req.params.id)
        },
        done: true
        },
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// POST REQUESTS
// POST /signup - Create new user
router.post('/signup', async (req, res) => {
  try {
    const { username, password, firstName, lastName, email, clean } = req.body
    const token = generateAccessToken({ id: req.body.username });
    res.json({ token });
    const data = await prisma.user.create({
      data: {
        username,
        password,
        firstName,
        lastName,
        email,
        clean,
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
});

// Add routes for other CRUD operations (update, delete)
// REQUIRED FUNCTIONALITY

// Create Booking
router.post('/booking', async (req, res) => {
  try {
    const { date, time, userId, cleanersId } = req.body
    const data = await prisma.booking.create({
      data: {
        date,
        user: {
          connect: { id: Number(userId) }
        },
        cleaners: {
          connect: { id: Number(cleanersId) }
        }
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
});

// POST /ratings - Create new rating
router.post('/ratings/', async (req, res) => {
  try {
    const { rating, comment, userId, cleanersId } = req.body
    const data = await prisma.rating.create({
      data: {
        rating,
        comment,
        user: {
          connect: { id: Number(userId) }
        },
        cleaners: {
          connect: { id: Number(cleanersId) }
        }
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
});

// POST /tasks - Create new task
router.post('/tasks', async (req, res) => {
  try {
    const { name, bookingId, cleanersId, done} = req.body
    const data = await prisma.tasks.create({
      data: {
        name,
        done,
        booking: {
          connect: { id: Number(bookingId) }
        },
        cleaners: {
          connect: { id: Number(cleanersId) }
        }
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
});

//POST REQUESTS
// POST /payments/:id - Update payment status
router.post('/payments/:id', async (req, res) => {
  try {
    const { bookingId, amount } = req.body
    const data = await prisma.payments.create({
      data: {
        amount,
        booking: {
          connect: { id: Number(bookingId) }
        },
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid data');
  }
});

// GET DATES
router.get('/earnings/:id/', async (req, res) => {
  try {
    const { yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd } = req.body
    
    const data = await prisma.booking.findMany({
      where: {
          cleanersId: {
            equals: Number(req.params.id)
          },
        date: {
          gte: new Date(yearStart + '-' + monthStart + '-'+ dayStart),
          lt: new Date(yearEnd + '-' + monthEnd + '-' + dayEnd),
        },
      },
      select: {
        date: true,
        amountDue: true,
      },
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
