const request = require('supertest')
const { getPort } = require('get-port-please')

const { disconnect } = require('../../config/setup-test-db')
const { startApplication } = require('../../app')
const generateFakeProfile = require('../helpers/profile')
const generateFakeComment = require('../helpers/comment')
const { createProfile } = require('../../controllers/profile');
const { createComment } = require('../../controllers/comment')

describe('Find User\'s Comments - POST /users/:userId/comments', () => {
  let app

  beforeAll(async () => {
    app = (await startApplication()).listen(await getPort({ random: true }))
  })

  afterAll(async () => {
    app.close()
    await disconnect()
  })

  it('should return 200 when successfully finding the comments from the user', async () => {
    const profile = await createProfile(generateFakeProfile())
    
    await createComment(profile.id, generateFakeComment({
      commentedBy: profile.id,
    }))

    const response = await request(app)
      .get(`/users/${profile._id}/comments`)
      .send()

    expect(response.status).toEqual(200)
  })

  it('should return the correct response when successfully finding the comments from the user', async () => {
    const profile = await createProfile(generateFakeProfile())
    
    const newComment = await createComment(profile.id, generateFakeComment({
      commentedBy: profile.id,
    }))

    const response = await request(app)
      .get(`/users/${profile._id}/comments`)
      .send()
    
    expect(response.body.data).toStrictEqual({
      comments: [JSON.parse(JSON.stringify({
        ...newComment,
        likes: [],
        numberOfLikes: 0,
      }))]
    })
  })
})