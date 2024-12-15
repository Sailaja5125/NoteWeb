import { NotesModel } from "../models/notes.models.js";
import asynchandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiresponse.js";
import geturl from "../utils/Firebase.js";
import fs from "fs";

const uploadNotes = asynchandler(async (req, res) => {
  const { subject, course, chapter, description } = req.body;

  // Check if files were uploaded
  const notes = req.file;

  if (!notes) {
    throw new ApiError(400, "No files uploaded");
  }

  try {
    // Read the file data
    const file = fs.readFileSync(notes.path);
    // Upload file to Firebase and get the URL
    const file_url = await geturl(file, notes.path); // Provide the file data and the filename

    // Create the note in the database
    const Notes = await NotesModel.create({
      owner: req.User, // look about this owner field
      file: file_url,
      subject,
      course,
      chapter,
      description,
    });

    // Check if the note was created
    if (!Notes) {
      throw new ApiError(500, "Failed to upload notes");
    }
   
    // Send a success response
    res.status(200).json(new ApiResponse(200, Notes , "Notes uploaded successfully"));
    fs.unlinkSync(notes.path)
  } catch (error) {
    // Handle errors related to file upload or database operations
    throw new ApiError(500, `An error occurred while uploading notes: ${error.message}`);
  }
});


const allnotes = asynchandler(async(req , res)=>{
   try {
    const noteslist = await NotesModel.find().populate('owner').select("-password");
    if(!noteslist){
     throw new ApiError(404 , "no notes are available right now");
    }
 
    res.status(200).json(new ApiResponse(200, noteslist ,"Notes retrieved successfully"));
   } catch (error) {
    throw new ApiError(500 , `notes could'nt be retrived right now ${error.message}`);
   }
});
// Assuming you're using Express and Mongoose
const searchNotes = async (req, res) => {
  try {
      const { query } = req.query;

      // Ensure that the query is a string
      if (!query || typeof query !== 'string') {
          return res.status(400).json({ error: 'Query must be a string' });
      }

      // Example of using $regex in Mongoose
      const notes = await NotesModel.find({
          $or: [
              { chapter: { $regex: query, $options: 'i' } },
              { subject: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } }
          ]
      });

      res.status(200).json(notes);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: "Notes couldn't be retrieved" });
  }
};

export { uploadNotes , allnotes , searchNotes};
