'use strict';

const router = require('express').Router();
const Ajv = require('ajv');

const { ProfileModel } = require('../models/profile')
const { HTTP_STATUS_CODES } = require('../utilities/http-status-code');

const ajv = new Ajv()

// NOTE: This is a mock data, commented out for the reference
// const profiles = [
//   {
//     "id": 1,
//     "name": "A Martinez",
//     "description": "Adolph Larrue Martinez III.",
//     "mbti": "ISFJ",
//     "enneagram": "9w3",
//     "variant": "sp/so",
//     "tritype": 725,
//     "socionics": "SEE",
//     "sloan": "RCOEN",
//     "psyche": "FEVL",
//     "image": "https://soulverse.boo.world/images/1.png",
//   }
// ];

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    mbti: {
      type: 'string',
    },
    enneagram: {
      type: 'string',
    },
    variant: {
      type: 'string',
    },
    tritype: {
      type: 'number',
    },
    socionics: {
      type: 'string',
    },
    sloan: {
      type: 'string',
    },
    psyche: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
  },
  required: [
    'name',
    'description',
    'mbti',
    'enneagram',
    'variant',
    'tritype',
    'socionics',
    'sloan',
    'psyche',
    'image'
  ],
  additionalProperties: false,
}

const validate = ajv.compile(schema)

module.exports = function() {
  router.get('/:id', async function(request, response) {
    const profile = await ProfileModel.findById(request.params.id).exec()
  
    response.render('profile_template', {
      profile,
    });
  });

  router.post('/', async function (request, response) {
    if (!validate(request.body)) {
      console.log(validate.errors)
      throw new Error(validate.errors)
    }

    const profile = await ProfileModel.create(request.body)

    response.status(HTTP_STATUS_CODES.CREATED).json({
      data: { profile }
    })
  })

  return router;
}