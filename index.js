require('dotenv').config();

require('./db');

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/docs', function (req, res, next) {
  swaggerFile.host = req.get('host');
  req.swaggerDoc = swaggerFile;
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

app.use((req, res, next) => {
  console.log('[' + (new Date()) + '] ' + req.method + ' ' + req.url);
  next();
});

app.use(routes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
