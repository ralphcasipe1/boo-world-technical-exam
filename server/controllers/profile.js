const { ProfileModel } = require('../models/profile')

module.exports = {
  async createProfile(data) {
    const newProfile = await ProfileModel.create(data)

    return await ProfileModel.findById(newProfile.id)
      .select({ __v: 0  })
  }
}