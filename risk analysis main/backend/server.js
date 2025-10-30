// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Environment variables
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/inversotie';

// // Express app setup
// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Example route
// app.get('/', (req, res) => {
//     res.send('Server is running!');
// });
// // app.use('/api/upload', uploadRoutes);

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import Entity from "./models/Entity.js";


import cors from "cors";

const app = express();
const upload = multer({ dest: "uploads/" });

import uploadRoutes from './routes/Uploadroutes.js';
import creditRiskRoutes from './routes/creditRiskRoutes.js';
import creditRiskdataRoutes from './routes/creditRiskdataRoutes.js';

// ... change all other imports to use require() as well

app.use(cors());
//

mongoose.connect("mongodb://localhost:27017/creditrisk", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// 🔹 Upload & Parse CSV


// 🔹 Upload & Parse CSV
// app.post("/upload", upload.single("file"), async (req, res) => {
//   const filePath = req.file.path;
//   const results = [];

//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on("data", (row) => {
//       // Convert to numbers where needed
//       Object.keys(row).forEach(key => {
//         if (!isNaN(row[key])) row[key] = Number(row[key]);
//       });
//       results.push(row);
//     })
//     .on("end", async () => {
//       try {
//         await Entity.insertMany(results);
//         fs.unlinkSync(filePath); // delete temp file
//         res.json({ message: "✅ Data uploaded & stored in MongoDB", count: results.length });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "DB insert failed" });
//       }
//     });
// });

// 🔹 Get All Entities

app.use('/api', uploadRoutes)
app.use("/api", creditRiskRoutes);
app.use("/api/creditrisk", creditRiskdataRoutes);


app.get("/entities", async (req, res) => {
  const data = await Entity.find();
  res.json(data);
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"))
// 🔹 Connect MongoDB
