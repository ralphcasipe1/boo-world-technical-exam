const request = require('supertest')
const { getPort } = require('get-port-please')

const { disconnect } = require('../../config/setup-test-db')
const { startApplication } = require('../../app')
const generateFakeProfile = require('../helpers/profile')

describe('CreateProfile - POST /', () => {
  let app

  beforeEach(async () => {
    app = (await startApplication()).listen(await getPort({ random: true }))
  })

  afterEach(async () => {
    await disconnect()
    app.close()
  })

  test('should return 201 when the profile is successfully created', async () => {
    const response = await request(app)
      .post('/')
      .send(generateFakeProfile())

    expect(response.status).toEqual(201)
  })
})