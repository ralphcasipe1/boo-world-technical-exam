const { model, Schema } = require('mongoose'); 

const MBTI = {
  INFP: 'INFP',
  INFJ: 'INFJ',
  ENFP: 'ENFP',
  ENFJ: 'ENFJ',
  INTJ: 'INTJ',
  INTP: 'INTP',
  ENTP: 'ENTP',
  ENTJ: 'ENTJ',
  ISFP: 'ISFP',
  ISFJ: 'ISFJ',
  ESFP: 'ESFP',
  ESFJ: 'ESFJ',
  ISTP: 'ISTP',
  ISTJ: 'ISTJ',
  ESTP: 'ESTP',
  ESTJ: 'ESTJ',
}

const ENNEAGRAM = {
  '1w2': '1w2',
  '2w3': '2w3',
  '3w2': '3w2',
  '3w4': '3w4',
  '4w3': '4w3',
  '4w5': '4w5',
  '5w4': '5w4',
  '5w6': '5w6',
  '6w5': '6w5',
  '6w7': '6w7',
  '7w6': '7w6',
  '7w8': '7w8',
  '8w7': '8w7',
  '8w9': '8w9',
  '9w8': '9w8',
  '9w1': '9w1',
  '9w3': '9w3',
}

module.exports = {
  ProfileModel: model('Profile', new Schema({
    name: {
      type: String,
      required: true,
    },
  
    description: {
      type: String,
      required: true,
    },
    
    mbti: {
      type: String,
      required: true,
      enum: Object.values(MBTI)
    },
    
    enneagram: {
      type: String,
      required: true,
      enum: Object.values(ENNEAGRAM)
    },
  
    variant: {
      type: String,
      required: true,
    },
  
    tritype: {
      type: String,
      required: true,
    },
    
    socionics: {
      type: String,
      required: true,
    },
    sloan: {
      type: String,
      required: true,
    },
    
    psyche: {
      type: String,
      required: true,
    },
  
    image: {
      type: String,
      required: true,
    },
  })),
  MBTI,
  ENNEAGRAM,
}


