const express = require('express');
const { celebrate } = require('celebrate');

const OngController = require('./controllers/NGOController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ngos', OngController.index);
routes.post('/ngos', celebrate(OngController.createValidation), OngController.create);

routes.get('/incidents', celebrate(IncidentController.indexValidation), IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate(IncidentController.deleteValidation), IncidentController.delete);

routes.get('/profile', celebrate(ProfileController.indexValidation), ProfileController.index);

module.exports = routes;