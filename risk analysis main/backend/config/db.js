// const express = require("express");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const csv = require("csv-parser");
// const fs = require("fs");
// const Entity = require("./models/Entity");

// const app = express();
// const upload = multer({ dest: "uploads/" });

// // 🔹 Connect MongoDB
// mongoose.connect("mongodb://localhost:27017/creditrisk", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error(err));

// // 🔹 Upload & Parse CSV
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

// // 🔹 Get All Entities
// app.get("/entities", async (req, res) => {
//   const data = await Entity.find();
//   res.json(data);
// });

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));
// // 