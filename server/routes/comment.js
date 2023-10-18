'use strict';

const router = require('express').Router();

const { Types: { ObjectId } } = require('mongoose')
const { CommentModel, CommentLikeModel } = require('../models/comment');
const { ProfileModel } = require('../models/profile');
const { HTTP_STATUS_CODES } = require('../utilities/http-status-code');

module.exports = function() {
  router.post('/users/:userId/comments', async function(request, response) {
    const profile = await ProfileModel.exists({ _id: request.params.userId }).exec()

    if (!profile) {
      return response.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        message: 'User not found.',
      })
    }

    const {
      commentedBy,
      title,
      comment,
      personalitySystems,
    } = request.body

    const newComment = await CommentModel.create({
      // NOTE: This should be supplied for the logged in user
      // For now we're just going to use the request's body
      commentedBy,
      commentedTo: request.params.userId,
      title,
      comment,
      personalitySystems,
    })

    const foundComment = await CommentModel
      .findById(newComment.id)
      .populate('commentedTo')
      .populate('commentedBy')
      // .populate('numberOfLikes')
      .exec()
      
    response.status(HTTP_STATUS_CODES.CREATED).json({
      data: { 
        comment: foundComment.toJSON(),
      }
    })
  });

  router.get('/users/:userId/comments', async function(request, response) {
    try {
      const comments = await CommentModel.aggregate([
        {
          $match: {
            commentedTo: new ObjectId(request.params.userId),
            ...(request.query?.personalitySystems?.mbti 
              ? { 'personalitySystems.mbti': request.query.personalitySystems.mbti }
              : {}),
            ...(request.query?.personalitySystems?.enneagram 
                ? { 'personalitySystems.enneagram': request.query.personalitySystems.enneagram }
                : {}),
            ...(request.query?.personalitySystems?.zodiac 
              ? { 'personalitySystems.zodiac': request.query.personalitySystems.zodiac }
              : {}),
          }
        },
        {
          $lookup: {
            from: 'commentlikes',
            localField: '_id',
            foreignField: 'commentId',
            as: 'likes'
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'commentedBy',
            foreignField: '_id',
            as: 'commentedBy'
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'commentedTo',
            foreignField: '_id',
            as: 'commentedTo'
          },
        },
        {
          $addFields: {
            numberOfLikes: { $size: '$likes' }
          }
        },
      ])
        .sort(request.query.sort || 'createdAt')
        .exec()
  
      response.status(HTTP_STATUS_CODES.OK).json({
        data: {
          comments,
        },
      })
    } catch (error) {
      // TODO: Handle this correctly
      console.log(error)
    }
  });
  
  router.post('/comments/:commentId/likes', async function(request, response) {
    const commentLike= await CommentLikeModel.create({
      // NOTE: This should be supplied for the logged in user
      // For now we're just going to use the request's body
      likedBy: request.body.likedBy,
      commentId: request.params.commentId,
    })
      
    return response.status(HTTP_STATUS_CODES.CREATED).json({
      data: { 
        commentLike,
      }
    })
  });

  router.get('/comments/:commentId/likes', async function(request, response) {
    const commentLikes= await CommentLikeModel.find()
      
    return response.status(HTTP_STATUS_CODES.OK).json({
      data: { 
        commentLikes,
      }
    })
  });

  return router;
}