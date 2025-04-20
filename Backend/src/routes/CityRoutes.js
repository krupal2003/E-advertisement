const routes=require("express").Router();
const cityController=require("../controllers/CityController");

routes.post("/addcity",cityController.addCity);
routes.get("/cities",cityController.getAllCity)
routes.get("/getcitiesbystate/:stateId",cityController.getCityByStateId)


module.exports=routes;