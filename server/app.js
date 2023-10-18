'use strict';

const express = require('express');
const { connect } = require('./config/setup-test-db')

async function startApplication() {
  const app = express();

  (async () => connect())()

  const port =  process.env.PORT || 3000;

  // set the view engine to ejs
  app.set('view engine', 'ejs');

  // middlewares
  app.use(express.json())

  // routes
  app.use('/', require('./routes/profile')());
  app.use('/', require('./routes/comment')());
  
  return app
}

module.exports = {
  startApplication,
}