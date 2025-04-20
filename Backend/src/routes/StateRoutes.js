const routes=require("express").Router();
const stateController=require("../controllers/StateController");

routes.post("/addState",stateController.addState);
routes.get("/allState",stateController.getState)

module.exports=routes