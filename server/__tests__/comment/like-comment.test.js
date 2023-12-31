const request = require('supertest')
const { getPort } = require('get-port-please')

const { disconnect } = require('../../config/setup-test-db')
const { startApplication } = require('../../app')
const generateFakeProfile = require('../helpers/profile')
const generateFakeComment = require('../helpers/comment')
const { createProfile } = require('../../controllers/profile');
const { createComment, findOneCommentLike } = require('../../controllers/comment')

describe('Like User\'s Comment - POST /comments/:commentId/likes', () => {
  let app

  const now = new Date()
  
  beforeAll(async () => {
    jest.useFakeTimers({
      now,
      doNotFake: ['nextTick']
    })

    app = (await startApplication()).listen(await getPort({ random: true }))
  })

  afterAll(async () => {
    jest.useRealTimers()
    app.close()
    await disconnect()
  })

  it('should return 201 when successfully liking the user\'s comment', async () => {
    const profile = await createProfile(generateFakeProfile())
    
    const newComment = await createComment(profile.id, generateFakeComment({
      commentedBy: profile.id,
    }))

    const response = await request(app)
      .post(`/comments/${newComment.id}/likes`)
      .send({
        likedBy: profile.id,
      })

    expect(response.status).toEqual(201)
  })

  it('should return a correct response when successfuly like the user\'s comment', async () => {
    const profile = await createProfile(generateFakeProfile())
    
    const newComment = await createComment(profile.id, generateFakeComment({
      commentedBy: profile.id,
    }))

    const response = await request(app)
      .post(`/comments/${newComment.id}/likes`)
      .send({
        likedBy: profile.id,
      })
  
    const commentLike = await findOneCommentLike(newComment.id, profile.id)

    expect(response.body.data).toStrictEqual({
      commentLike
    })
  })
})