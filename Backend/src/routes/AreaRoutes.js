const routes = require('express').Router();
const areaController = require('../controllers/AreaController');

routes.post('/add', areaController.addArea);
routes.get('/', areaController.getAreas);
routes.get("/areabycity/:cityid",areaController.getAreaByCity)
module.exports = routes;