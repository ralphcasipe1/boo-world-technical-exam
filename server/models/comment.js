const { model, Schema, default: mongoose } = require('mongoose'); 

// const commentPersonalitySystemSchema = new Schema({
//   // TODO: Enum
//   mbti: {
//     type: String,
//     required: false,
//   },

//   // TODO: Enum
//   enneagram: {
//     type: String,
//     required: false,
//   },

//   // TODO: Enum
//   zodiac: {
//     type: String,
//     required: false,
//   }
// })

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
// commentSchema.virtual('numberOfLikes', {
//   ref: 'CommentLike',
//   localField: '_id',
//   foreignField: 'commentId',
//   count: true,
// })

module.exports = {
  // CommentPersonalitySystemModel: model(
  //   'CommentPersonalitySystem',
  //   commentPersonalitySystemSchema,
  // ),
  CommentLikeModel: model('CommentLike', commentLikeSchema),
  CommentModel: model('Comment', commentSchema),
}


