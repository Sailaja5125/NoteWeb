import asynchandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { UserModel } from "../models/user.models.js";
import jwt, { decode } from "jsonwebtoken";

export const verifyUser = asynchandler(async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.header("Authorization")
        console.log('Authorization Header:', authHeader); // Debugging log

        if (!authHeader) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }
        // Verify token
        const decoded = jwt.verify(authHeader, process.env.ACCESS_TOKEN);

        // Find user by decoded token ID
        console.log(decoded)
        const User = await UserModel.findById(decoded._id).select("-password");
        console.log('User:', User); // Debugging log

        if (!User) {
            throw new ApiError(401, "Invalid Access Token: User not found");
        }
        // Attach user to request object
        req.User = User;
        next();
    } catch (error) {
        console.error('Verification Error:', error); // Debugging log
        next(new ApiError(401, "Invalid access"));
    }
});
