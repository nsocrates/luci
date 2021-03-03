const request = require('supertest')
const server = require('../../app.js')

describe('Users endpoint', () => {
  it('Lists all Users', async done => {
    const response = await request(server).get('/api/user')
    expect(response.statusCode).toEqual(200)
    expect(Array.isArray(response.body)).toEqual(true)
    done()
  })
})
