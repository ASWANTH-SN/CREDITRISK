// // const express = require('express');
// // const multer = require('multer');
// // const path = require('path');
// // const fs = require('fs');
// // const { handleFileUpload } = require('../controllers/uploadController');

// // const router = express.Router();

// // // --- Multer Configuration ---

// // // Ensure the 'uploads' directory exists
// // const uploadDir = 'uploads';
// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir);
// // }

// // // Set up storage engine for Multer
// // const storage = multer.diskStorage({
// //   // Define the destination folder for uploaded files
// //   destination: (req, file, cb) => {
// //     cb(null, uploadDir); // Save files in the 'uploads' folder
// //   },
// //   // Define the filename for the uploaded file
// //   filename: (req, file, cb) => {
// //     // To avoid name conflicts, add a timestamp to the original filename
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
// //   },
// // });

// // // Initialize Multer with the storage configuration
// // const upload = multer({ storage: storage });

// // // --- API Route Definition ---

// // // Define the POST route for file uploads
// // // The route will be '/api/upload' because we will prefix it in server.js
// // // 'upload.single('csvFile')' is the middleware that processes the file.
// // // 'csvFile' MUST match the name attribute of the <input type="file"> on the frontend.
// // router.post('/', upload.single('csvFile'), handleFileUpload);

// // module.exports = router;

// const express = require("express");
// const multer = require("multer");
// const csv = require("csv-parser");
// const fs = require("fs");
// const Entity = require("../models/Entity");

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // POST /upload
// router.post("/uploadcsv", upload.single("file"), async (req, res) => {
//   const filePath = req.file.path;
//   const results = [];

//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on("data", (row) => {
//       // Convert numeric values
//       Object.keys(row).forEach((key) => {
//         if (!isNaN(row[key])) {
//           row[key] = Number(row[key]);
//         }
//       });
//       results.push(row);
//     })
//     .on("end", async () => {
//       try {
//         await Entity.insertMany(results);
//         fs.unlinkSync(filePath); // delete temp file
//         res.json({
//           message: "✅ Data uploaded & stored in MongoDB",
//           count: results.length,
//         });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "DB insert failed" });
//       }
//     });
// });

// // GET /upload/entities
// router.get("/entities", async (req, res) => {
//   try {
//     const data = await Entity.find();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch entities" });
//   }
// });

// module.exports = router;
const express = require('express');
const multer = require('multer');
const { handleFileUpload } = require('../controllers/uploadController');

const router = express.Router();

// Configure Multer for temporary file storage
const upload = multer({ dest: 'uploads/' });

// Define the API route: POST /api/upload
// 'upload.single('csvFile')' middleware processes a single file from the form field named 'csvFile'
router.post('/uploads', upload.single('csvFile'), handleFileUpload);

module.exports = router;