const { model, Schema } = require('mongoose'); 

const commentLikeSchema = new Schema({
  commentId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Comment',
  },
  likedBy: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Profile',
  },
})

const commentSchema = new Schema({
  commentedBy: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Profile',
  },

  commentedTo: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Profile',
  },

  title: {
    type: String,
    required: true,
  },

  comment: {
    type: String,
    required: true,
  },

  personalitySystems: {
    type: Schema.Types.Mixed,
    required: true,
  },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
})

module.exports = {
  CommentLikeModel: model('CommentLike', commentLikeSchema),
  CommentModel: model('Comment', commentSchema),
}


