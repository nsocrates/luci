const request = require('supertest')
const server = require('../../app.js')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

describe('User endpoints', () => {
  const user = userResponse = {
    name: "Kelly",
    group: "MARKETING",
    state: "INACTIVE",
  }

  it('Lists all Users', async done => {
    const response = await request(server).get('/api/user')
    expect(response.statusCode).toEqual(200)
    expect(Array.isArray(response.body)).toEqual(true)
    done()
  })

  it('Returns the created User entity', async done => {
    const response = await request(server)
      .post('/api/user')
      .send(user)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toMatchObject(userResponse)
    done()
  })

  it('Updates the User', async done => {
    const response = await request(server)
      .put('/api/user/1')
      .send(user)

    expect(response.statusCode).toEqual(202)
    expect(response.body).toMatchObject(userResponse)
    done()
  })

  it('Finds the specified User', async done => {
    const response = await request(server)
      .get('/api/user/1')

    expect(response.statusCode).toEqual(200)
    expect(response.body).toMatchObject(userResponse)
    done()
  })

  it('Deletes the specified User', async done => {
    const response = await request(server)
      .delete('/api/user/1')

    expect(response.statusCode).toEqual(204)
    done()
  })

  it('Returns 404 if specified User does not exist', async done => {
    const response = await request(server)
      .get('/api/user/1')

      expect(response.statusCode).toEqual(404)
      done()
  })
})
