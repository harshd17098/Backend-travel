// const jwt = require("jsonwebtoken");
// const JWT_SECRET = "TravelBooking";
// const Admin = require("../model/adminSchema");

// const authMiddleware = async(req, res, next) => {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized! No token provided." });
//     }
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.admin = await Admin.findById(decoded.id).select("-password");
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(403).json({ message: "Invalid or expired token." });
//     }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const JWT_SECRET = "TravelBooking";
const Admin = require("../model/adminSchema");
const User = require("../model/userSchema");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized! Please login to proceed." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (admin) {
      req.admin = admin;
      req.userRole = "admin";
      return next();
    }

    const user = await User.findById(decoded.id);
    if (user) {
      req.user = user;
      req.userRole = "user";
      return next();
    }

    return res.status(404).json({ message: "User or Admin not found!" });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;

