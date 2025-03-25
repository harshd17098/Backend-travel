const express= require("express")
const Admin = require("../model/adminSchema")
const User= require("../model/userSchema")
const jwt = require("jsonwebtoken");
const bcrypt= require("bcrypt")
const authMiddleware= require("../config/auth");
const Flight = require("../model/flightSchema");
const Hotel= require("../model/hotelSchema")

const router= express.Router()

router.post("/admin/register", async (req, res) => {
    try {
        // console.log( req.body);

        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log("Admin already exists");
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = new Admin({ name, email, password: hashedPassword, role });
            console.log(admin);
            await admin.save();
            console.log("Admin registered");

            res.status(201).json({ message: "Admin registered successfully!" });
        }
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post("/admin/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        // console.log(admin);
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: admin._id, role: "admin" }, "TravelBooking", { expiresIn: "1d" });

        // console.log("admin logged in success",token);
        res.status(201).json({ message: "Admin Login successfully!",token });
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/AdminDashboard",authMiddleware,async (req,res) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({ message: "Access denied! Admins only." });
      }
      res.json({ message: `Welcome to Admin Dashboard, ${req.admin.name}` });
})

// User Registration
router.post("/user/register", async (req, res) => {
    const { name, email, password ,role} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// User Login
router.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: "user" }, "TravelBooking", { expiresIn: "1d" });

        res.status(200).json({ token, message: "User logged in successfully",token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/user/profile", authMiddleware, async (req, res) => {
    if (req.userRole !== "user") return res.status(403).json({ message: "Access denied" });
    try {
        // console.log(req.user);
        const user = await User.findById(req.user.id);
        // console.log(user);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/admin/profile", authMiddleware, async (req, res) => {
    if (req.userRole !== "admin") return res.status(403).json({ message: "Access denied" });
    try {
        // console.log(req.admin);
        const admin = await Admin.findById(req.admin.id);
        // console.log(admin);
        res.status(200).json({ admin });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/admin/getFlight", authMiddleware,async(req,res)=>{
    if (req.userRole !== "admin") return res.status(403).json({ message: "Access denied" });
    try {
        // console.log(req.admin);
        const admin = req.admin
        const flights = await Flight.find({adminId:admin._id})
        // console.log(flights);
        res.status(200).json({ message: "flight get successfully!",admin, flights});
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

router.get("/admin/getHotel", authMiddleware,async(req,res)=>{
    // console.log("getHotel route accessed");
    if (req.userRole !== "admin") return res.status(403).json({ message: "Access denied" });
    try {
        // console.log(req.admin);
        const admin = req.admin
        let Hotels = await Hotel.find({adminId:admin._id})
        // console.log(Hotels);
        res.status(200).json({ message: "Hotel get successfully!",admin, Hotels});
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

module.exports= router;