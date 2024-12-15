import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { uploadNotes  , allnotes, searchNotes} from "../controllers/notes.controller.js";
import { verifyUser } from "../middleware/auth.js";
const router = Router()

router.route("/uploadnotes").post(verifyUser,upload.single('notes'),uploadNotes)
router.route("/shownotes").get(verifyUser,allnotes)
router.route("/searchnotes").get(verifyUser,searchNotes)


export default router