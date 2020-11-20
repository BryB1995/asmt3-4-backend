
'use strict';
//require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
console.log(app);
app.use((req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

const startServer = async _ => {

  //console.log(process.env.DB_NAME);
  const database = require("./src/database");
  let db = await database.setup();
console.log(db);
  const routes = require('./src/routes');
  //console.log(routes);
  routes.register(app, db);

  const PORT = process.env.PORT || 3306;
  const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
  process.on('unhandledRejection', err => {
    console.error(err);
    throw err;
  });

  return server;
}

startServer()