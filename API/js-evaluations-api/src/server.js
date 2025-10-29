require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const config = require('./config');
const { connectDB } = require('./db/client');
const models = require('./models'); // carrega e sincroniza models
const routes = require('./routes');

const app = express();
app.use(express.json());

try {
  const swaggerDocument = require('./docs/swagger.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.log('Swagger document not found, skipping /api-docs');
}

app.use('/api', routes);

const PORT = config.port || process.env.PORT || 3000;

connectDB()
  .then(async () => {
    await models.sync(); // sincroniza models (usa sequelize.sync)
    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`);
      console.log(`Swagger: http://localhost:${PORT}/api-docs (if available)`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });

module.exports = app;