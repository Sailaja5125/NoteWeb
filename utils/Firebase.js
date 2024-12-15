// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ApiError } from "./apiError.js";
import fs from "fs"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA47cfTDsW1OfED5klZhEZSoOVv40k3KEo",
  authDomain: "notes-app-c0f36.firebaseapp.com",
  projectId: "notes-app-c0f36",
  storageBucket: "notes-app-c0f36.appspot.com",
  messagingSenderId: "1013307924404",
  appId: "1:1013307924404:web:2db09214293b3fb6f25ce1",
  measurementId: "G-BK0EEF7MN1"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const store = getStorage(firebaseapp);

// Function to upload file and get URL
export default async function geturl(file, filepath) {
  const storageRef = ref(store, filepath); // Create a reference with the desired file path

  try {
    // Upload the file data
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Uploaded file!');
    // fs.unlinkSync(file)
    // Get the download URL
    const url = await getDownloadURL(snapshot.ref);
    console.log('Download URL:', url);
    return url;
  } catch (error) {
    console.error('Upload error:', error);
    // fs.unlinkSync(file)
    throw new ApiError(500 , `${error.message}`); // Rethrow error to be handled by the caller

  }
}
