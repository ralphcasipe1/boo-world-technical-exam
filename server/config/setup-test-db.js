const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

/**
 * @type {MongoMemoryServer | null}
 */
let mongodb = null;

const connect = async () => {
  mongodb = await MongoMemoryServer.create();
  const uri = mongodb.getUri();

  await mongoose.connect(uri);
}

const disconnect = async () => {
  if (mongodb) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongodb.stop();
  }
}

module.exports = {
  connect,
  disconnect,
}