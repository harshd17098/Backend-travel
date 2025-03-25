const express = require("express")
const mongoose = require("mongoose")
const authMiddleware = require("../config/auth")
const Hotel = require("../model/hotelSchema")

const hotelRoute = express.Router()

hotelRoute.post("/add", authMiddleware, Hotel.uploadImage, async (req, res) => {
    if (req.userRole !== "admin") return res.status(403).json({ message: "Access denied" });
    try {
        console.log(req.file);
        let imagePath=""
        if (req.file) {
            imagePath= `/uploads/hotels/${req.file.filename}`
        }
        req.body.image =imagePath
        req.body.role = req.userRole
        req.body.adminId = req.admin._id
        const rec = await Hotel.create(req.body)
        // console.log(rec);
        res.status(201).json({ message: "Hotel added successfully!", rec});
    } catch (error) {
        res.status(500).json({ message: "Server error while adding hotel", error });
    }
})
hotelRoute.get("/get", authMiddleware, async(req,res)=>{
    if (req.userRole!=="user")  return res.status(403).json({ message: "Access denied" });
    try {
        const allHotel= await Hotel.find()
        // console.log(allHotel);
        res.status(201).json({ message: "Hotel get successfully!", allHotel});
    } catch (error) {
        res.status(500).json({ message: "Server error while getting hotel", error });
    }
})



module.exports = hotelRoute