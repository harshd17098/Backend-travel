const express= require("express")
const mongoose= require("mongoose")
const Flight= require("../model/flightSchema")
const authMiddleware= require("../config/auth")

const flightRoute= express.Router()

flightRoute.post("/add",authMiddleware, async(req,res)=>{
    try {
        // console.log(req.body);
        // console.log(req.user);
        req.body.adminId= req.admin._id;
        const res= await Flight.create(req.body)
        if (res) {
            console.log("flight added success");
        }
    } catch (error) {
        console.log("something went wrong");
    }
})
flightRoute.get("/get",authMiddleware,async(req,res)=>{
    try { 
        const admin = req.admin
        let flights;
        // if (req.admin) {
        //     flights= await Flight.find({adminId:req.admin._id})
        // }
        // console.log(flights);
        let allFlights= await Flight.find() 
        res.json({admin,allFlights})
    } catch (error) {
        console.log("something went wrong",error);
    }
})
flightRoute.get("/fetchFlight/:id" ,authMiddleware, async(req,res)=>{
    try {
        // console.log(req.params.id);
        const singleFlight = await Flight.findById(req.params.id)
        res.json({singleFlight})
    } catch (error) {
        res.status(400).json({msg:"error fetching flight" ,error})
    }
})

module.exports= flightRoute
