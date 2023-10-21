const { faker } = require('@faker-js/faker')

const { MBTI, ENNEAGRAM } = require('../../models/profile')

const mbtis = Object.values(MBTI)
const enneagrams = Object.values(ENNEAGRAM)

module.exports = (overrides) => ({
  name: faker.person.fullName(),
  description: faker.lorem.sentence(),
  mbti: mbtis[faker.number.int({ min: 0, max: mbtis.length - 1 })],
  enneagram: enneagrams[faker.number.int({ min: 0, max: enneagrams.length - 1 })],
  variant: 'sp/so',
  tritype: 725,
  socionics: 'SEE',
  sloan: 'RCOEN',
  psyche: 'FEVL',
  image: faker.internet.avatar(),
  ...overrides,
})