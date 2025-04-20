const express=require("express")
const app=express();
const mongoose=require("mongoose")
const cors = require("cors")

app.use(cors())
app.use(express.json()) //to accept data as json...

const rollRoutes=require("./src/routes/RoleRoutes")
app.use(rollRoutes)

const userRoutes=require("./src/routes/UserRoutes")
app.use(userRoutes)

const stateRoutes=require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)

const cityRoutes=require("./src/routes/CityRoutes")
app.use("/city",cityRoutes);

const areaRoutes=require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes);

const hordingsRoutes=require("./src/routes/HordingsRoutes");
app.use("/hordings",hordingsRoutes)

const bookingRoutes=require("./src/routes/BookingRoutes")
app.use("/booking",bookingRoutes)

const paymentRoutes=require("./src/routes/PaymentRoutes")
app.use("/payment",paymentRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


const port=8080;
app.listen(port,(req,res)=>{
    console.log("listning")
})