const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
require('dotenv').config();


describe('User Controller', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/user-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@example.com' });
    expect(response.status).toBe(201);
  });

  it('should update a user', async () => {
    // Create a user first (you can use the code you provided earlier)
    const createUserResponse = await request(app)
      .post('/api/users')
      .send({ name: 'Jane', email: 'jane@example.com' });

    const userId = createUserResponse.body._id; // Get the user ID from the response

    // Now, update the user
    const updateResponse = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'Updated Name' });

    expect(updateResponse.status).toBe(200);
  });

  it('should get a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  
});
