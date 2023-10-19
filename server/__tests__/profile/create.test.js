const request = require('supertest')
const { getPort } = require('get-port-please')

const { disconnect } = require('../../config/setup-test-db')
const { startApplication } = require('../../app')
const generateFakeProfile = require('../helpers/profile')
const omit = require('../../utilities/omit')

describe('CreateProfile - POST /', () => {
  let app

  beforeAll(async () => {
    app = (await startApplication()).listen(await getPort({ random: true }))
  })

  afterAll(async () => {
    app.close()
    await disconnect()
  })

  it('should return 201 when the profile is successfully created', async () => {
    const response = await request(app)
      .post('/')
      .send(generateFakeProfile())

    expect(response.status).toEqual(201)
  })
  
  it('should return a correct response after successfully creating a profile', async () => {
    const profile = generateFakeProfile()
    const response = await request(app)
      .post('/')
      .send(profile)

    expect(omit(['_id'], response.body.data.profile)).toStrictEqual(profile)
    expect(response.body.data.profile).toHaveProperty('_id')
  })

  it('should return 422 when the is an invalid body', async () => {
    const response = await request(app)
      .post('/')
      .send({
        name: generateFakeProfile().name
      })
    
      expect(response.status).toEqual(422)
  })

  it('should return a proper message when name is not included', async () => {
    const response = await request(app)
      .post('/')
      .send(omit(['name'], generateFakeProfile()))
    
      expect(response.body.errors).toStrictEqual([
        { message: 'must have required property \'name\'' },
      ])
  })
})