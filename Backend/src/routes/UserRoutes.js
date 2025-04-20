const routes=require("express").Router()
const userController=require("../controllers/UserConrollers")

routes.get("/users",userController.getAllUser);
routes.post("/user",userController.signUp);
routes.delete("/user/:id",userController.deleteUser)
routes.get("/user/:id",userController.getUserById)
routes.post("/user/login",userController.login)

module.exports=routes