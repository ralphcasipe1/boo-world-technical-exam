const request = require('supertest')
const { getPort } = require('get-port-please')

const { disconnect } = require('../../config/setup-test-db')
const { startApplication } = require('../../app')
const generateFakeProfile = require('../helpers/profile')
const omit = require('../../utilities/omit')
const { createProfile } = require('../../controllers/profile');

describe('Create Comment - POST /users/:userId/comments', () => {
  let app

  beforeAll(async () => {
    app = (await startApplication()).listen(await getPort({ random: true }))
  })

  afterAll(async () => {
    app.close()
    await disconnect()
  })

  it('should return 201 when successfully created a comment', async () => {
    const profile = await createProfile(generateFakeProfile())
    const response = await request(app)
      .post(`/users/${profile._id}/comments`)
      .send({
        commentedBy: profile.id,
        title: 'test',
        comment: 'test',
        personalitySystems: {
          mbti: 'INTJ',
        }
      })

    expect(response.status).toEqual(201)
  })
})