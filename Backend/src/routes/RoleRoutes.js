const routes=require("express").Router()
const rollController=require("../controllers/RoloControllers")

routes.get("/roles",rollController.getAllRoles)
routes.post("/role",rollController.addRole)
routes.delete("/role/:id",rollController.deleteRole)
routes.get("/role/:id",rollController.getRoleById)

module.exports=routes