import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// defining protect middleware
const protect = asyncHandler(async (req, res, next) => {
    let token; 
    
    // Read the jWT from the cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) // Here we will get the action payload which is userId, we used userId while jwt.sign of jwt token generation
            req.user = await User.findById(decoded.userId).select('-password'); // password will not be returned
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token!');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});


// defining admin middleware
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else {
        throw new Error('Not authorized as admin');
    }
};


export { protect, admin };

