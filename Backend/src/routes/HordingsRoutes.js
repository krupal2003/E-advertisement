const routes = require('express').Router();
const hordingController = require('../controllers/HordingsController');
routes.post('/add', hordingController.addHording);
routes.post('/addhording', hordingController.addHordingWithFile);
routes.get('/all', hordingController.getAllHordings);
routes.get('/userscreens/:userId', hordingController.getAllHordingsOfUser);
routes.put('/updatehoarding/:id',hordingController.updateHoardingsOfUser);
routes.get('/hoardingById/:id', hordingController.getHordingById);
routes.get('/gethordingbyarea/:areaId', hordingController.getAllHordingsByArea);

module.exports = routes;