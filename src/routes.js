const express = require('express');
const CidadesController = require("./controllers/CidadesController");

const routes = express.Router();

routes.get('/citys', CidadesController.index);
routes.post('/citys/:uf', CidadesController.select);

module.exports = routes;