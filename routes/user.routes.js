import { Router } from "express"
import {register , login ,details} from "../controllers/user.controller.js"
import { body } from "express-validator"
import { verifyUser } from "../middleware/auth.js"
const router = Router()

// register
router.route("/register").post([
    [
        body("username").isLength({ min: 3 }),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
    ],
    register
])

router.route("/login").post(login)
router.route("/details").post(verifyUser,details)

export default router