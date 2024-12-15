import express from "express"
import cors from "cors"
import userrouter from "./routes/user.routes.js"
import notesrouter from "./routes/notes.routes.js"
const app = express()

app.use(cors({
    origin : process.env.ORIGIN,
    allowedHeaders: ['Content-Type','Authorization'],
    credential : true
}))
app.options('*',cors());
app.use(express.json())
app.use(express.urlencoded({extended:true})); 
app.use(express.static("frontend"))

// api 
app.use("/api/v1/users",userrouter);
app.use("/api/v1/notes",notesrouter);

export default app
