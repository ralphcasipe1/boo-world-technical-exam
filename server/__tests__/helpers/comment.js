const { faker } = require('@faker-js/faker')

const { MBTI, ENNEAGRAM } = require('../../models/profile')

const mbtis = Object.values(MBTI)
const enneagrams = Object.values(ENNEAGRAM)

module.exports = (overrides) => ({
  title: faker.lorem.word(),
  comment: faker.lorem.sentence(),
  personalitySystems: {
    mbti: mbtis[faker.number.int({ min: 0, max: mbtis.length - 1 })],
    enneagram: enneagrams[faker.number.int({ min: 0, max: enneagrams.length - 1 })],
    zodiac: 'Leo',
  },
  ...overrides,
})