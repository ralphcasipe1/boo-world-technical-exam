const { CommentModel, CommentLikeModel } = require('../models/comment')

module.exports = {
  async createComment(commentTo, data) {
    const {
      commentedBy,
      title,
      comment,
      personalitySystems,
    } = data

    const newComment = await CommentModel.create({
      // NOTE: This should be supplied for the logged in user
      // For now we're just going to use the request's body
      commentedBy,

      commentedTo: commentTo,
      title,
      comment,
      personalitySystems,
    })
    
    const populatedNewComment = await CommentModel
      .findById(newComment.id)
      .populate('commentedTo')
      .populate('commentedBy')
      .exec()

    return populatedNewComment.toJSON()
  },

  async findOneCommentLikeById(commentLikeId) {
    const commentLike = await CommentLikeModel.findById(commentLikeId)
        .populate('commentId', 'title comment personalitySystems')
        .populate('likedBy')
        .exec()

    return commentLike.toJSON()
  },

  async findOneCommentLike(commentId, likedBy) {
    const commentLike = await CommentLikeModel.findOne({
      commentId,
      likedBy
    })
      .populate('commentId', 'title comment personalitySystems')
      .populate('likedBy')
      .exec()

    return commentLike.toJSON()
  }
}