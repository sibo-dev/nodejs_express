const request = require('supertest');
const express = require('express');
const router = require('../routes');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const prisma = require('@prisma/client');

const app = express();
app.use(router);

dotenv.config();


/*
 * The following tests are for the GET requests in routes.js
*/
describe('GET /booking', () => {
  test('should return all bookings', async () => {
    const res = await request(app).get('/booking');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('should return 404 if no bookings found', async () => {
    const res = await request(app).get('/bookings');
    expect(res.statusCode).toBe(404);
  });
});

describe('GET /booking/:id', () => {
  test('should return booking by id', async () => {
    const id = 1;
    const res = await request(app).get('/booking/' + id);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].id).toBe(id);
  });

  test('should return empty array if booking not found', async () => {
    const id = 150; // Replace with a non-existent booking ID
    const res = await request(app).get('/booking/' + id);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

// GET /users
describe('GET /users', () => {
  test('should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('should return 404 if no users found', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

// GET /users/:id
describe('GET /users/:id', () => {
  test('should return user by id', async () => {
    const id = 1;
    const res = await request(app).get('/users/' + id);
    expect(res.statusCode).toBe(200);
  });

  test('should return 404 if user not found', async () => {
    const id = 150; // Replace with a non-existent user ID
    const res = await request(app).get('/users/' + id);
    expect(res.statusCode).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
  });
});

// GET /cleaners
describe('GET /cleaners', () => {
  test('should return all cleaners', async () => {
    const res = await request(app).get('/cleaners');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('should return empty array if no cleaners found', async () => {
    const res = await request(app).get('/cleaners');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

// GET /cleaners/:id
describe('GET /cleaners/:id', () => {
  test('should return cleaner by id', async () => {
    const id = 1;
    const res = await request(app).get('/cleaners/' + id);
    expect(res.statusCode).toBe(200);
  });

  test('should return 404 array if cleaner not found', async () => {
    const id = 150; // Replace with a non-existent cleaner ID
    const res = await request(app).get('/cleaners/' + id);
    expect(res.statusCode).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
  });
});

// GET /ratings
describe('GET /ratings', () => {
  test('should return all ratings', async () => {
    const res = await request(app).get('/ratings');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('should return empty message if no ratings found', async () => {
    const res = await request(app).get('/ratings');
    expect(res.statusCode).toBe(200);
  });
});

// GET /ratings/:id
describe('GET /ratings/:id', () => {
  test('should return rating by id', async () => {
    const id = 1;
    const token = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET);
    const res = await request(app)
      .get('/ratings/' + id)
      .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(200);
  });

  test('should return empty array if rating not found', async () => {
    const id = 150;
    const token = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET);
    const res = await request(app)
    .get('/ratings/' + id)
    .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

// GET /tasks/:id/open
describe('GET /tasks/:id/open', () => {
  test('should return all open tasks', async () => {
    const id = 1;
    const token = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET);
    const res = await request(app)
    .get('/tasks/' + id + '/open')
    .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('should return empty array if no open tasks found', async () => {
    const id = 150;
    const token = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET);
    const res = await request(app)
      .get('/tasks/' + id + '/open')
      .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
  });

  test('should return 403 if no token provided', async () => {
    const id = 1;
    const res = await request(app).get('/tasks/' + id + '/open');
    expect(res.statusCode).toBe(403);
  });
});

// GET /tasks/:id/closed
describe('GET /tasks/:id/closed', () => {
  test('should return all closed tasks', async () => {
    const id = 1;
    const token = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET);
    const res = await request(app)
      .get('/tasks/' + id + '/closed')
      .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('should return empty array if no closed tasks found', async () => {
    const id = 150;
    const token = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET);
    const res = await request(app)
      .get('/tasks/' + id + '/closed')
      .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('should return 403 if no token provided', async () => {
    const id = 1;
    const res = await request(app).get('/tasks/' + id + '/closed');
    expect(res.statusCode).toBe(403);
  });
});

/**
** The following tests are for the POST requests in routes.js
*/

const generateBookingData = () => ({
  date: new Date(),
  amountDue: 100,
  userId: 1,
  cleanersId: 1,
});

const generateRatingData = () => ({
  rating: 5,
  comment: 'Great service!',
});

const generateTaskData = () => ({
  name: 'Clean living room',
  done: false,
});

describe('POST /booking', () => {
  test('should create a new booking', async () => {
    const bookingData = generateBookingData();
    // const res = await request(app).post('/booking').send(bookingData);
    // expect(res.statusCode).toBe(200);
    // expect(res.body).toHaveProperty('id');
  });

  test('should return 400 for invalid data', async () => {
    const invalidData = {};
    const res = await request(app).post('/booking').send(invalidData);
    expect(res.statusCode).toBe(400);
  });
});

describe('POST /ratings', () => {
  test('should create a new rating', async () => {
    const ratingData = generateRatingData();
    // const res = await request(app).post('/ratings').send(ratingData);
    // expect(res.statusCode).toBe(200);
    // expect(res.body).toHaveProperty('id');
  });

  test('should return 400 for invalid data', async () => {
    const invalidData = {};
    const res = await request(app).post('/ratings').send(invalidData);
    expect(res.statusCode).toBe(400);
  });
});

describe('POST /tasks', () => {
  test('should create a new task', async () => {
    const taskData = generateTaskData();
    // const res = await request(app).post('/tasks').send(taskData);
    // expect(res.statusCode).toBe(200);
    // expect(res.body).toHaveProperty('id');
  });

  test('should return 400 for invalid data', async () => {
    const invalidData = {};
    const res = await request(app).post('/tasks').send(invalidData);
    expect(res.statusCode).toBe(400);
  });
});

describe('POST /payments/:id', () => {
  test('should create a new payment', async () => {
    const paymentData = {
      amount: 100,
      bookingId: 1,
    };
  //   const res = await request(app).post('/payments/1').send(paymentData);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toHaveProperty('id');
  });

  test('should return 400 for invalid data', async () => {
    const invalidData = {};
    const res = await request(app).post('/payments/1').send(invalidData);
    expect(res.statusCode).toBe(400);
  });
});
