const { startApplication } = require('./app');

const PORT = process.env.HTTP_PORT || 3000;

(async () => {
  const app = await startApplication()

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  })
})();