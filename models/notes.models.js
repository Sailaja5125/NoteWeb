import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    owner :{
        type : mongoose.Types.ObjectId,
        ref : 'User',
    },
    file:{
        type : String,
        required:true,
    },
    subject:{
        type : String,
        required : true
    },
    course:{
        type :String,
        required : true,
    },
    chapter:{
        type : String,
        default : ""
    },
    description:{
        type : String,
        default :""
    }
},{timestamps:true})

export const NotesModel = mongoose.model("Notes",NotesSchema);