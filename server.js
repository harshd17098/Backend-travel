const express= require("express")
const mongoose= require("mongoose")
const port= 7890;
const db= require("./config/dbConnect")
const cors= require("cors")
const path= require("path")

const app= express()
app.use(cors());
app.use(express.json())
// app.use(express.urlencoded());

// dbConnect(); 

// mongoose.connect("mongodb://localhost:27017/travel_booking", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

app.use("/", require("./routes/adminUserRoutes"))
app.use("/flights",require("./routes/flightRoutes"))
app.use("/hotels",require("./routes/hotelRoutes"))
app.use("/booking",require("./routes/bookingRoutes"))

app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.listen(port, () => {
    console.log(`Server starting at http://localhost:${port}`);
})