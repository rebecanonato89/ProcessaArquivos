const express = require('express');
const CidadesController = require("./controllers/CidadesController");

const routes = express.Router();

routes.get('/citys', CidadesController.index);
routes.post('/citys/:uf', CidadesController.select);
routes.get('/citysCalculosMaior', CidadesController.calculoMaioresCidades);
routes.get('/citysCalculosMenor', CidadesController.calculoMenoresCidades);
routes.get('/citysMaiorNome', CidadesController.calculoMaiorNomeCidade);
routes.get('/citysMenorNome', CidadesController.calculoMenorNomeCidade);
routes.get('/citysMaior', CidadesController.calculoMaiorCidade);
routes.get('/citysMenor', CidadesController.calculoMenorCidade);

module.exports = routes;