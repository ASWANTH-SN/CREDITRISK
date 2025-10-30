// const fs = require('fs'); // Node.js File System module
// const csv = require('csv-parser'); // The CSV parsing library

// // This function handles the file upload and processing logic
// const handleFileUpload = (req, res) => {
//   try {
//     // Check if a file was uploaded by Multer
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'No file was uploaded.',
//       });
//     }

//     // --- NEW: Process the CSV file after upload ---
//     const results = [];
//     const filePath = req.file.path; // Path to the uploaded file

//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on('data', (data) => {
//         // This event fires for each row in the CSV
//         results.push(data);
//       })
//       .on('end', () => {
//         // This event fires when the entire file has been read
//         console.log('CSV file successfully processed.');
//         console.log('Data:', results);




        
//         fs.unlinkSync(filePath); 



//         //  try {
//         //   await CreditRisk.insertMany(results); // bulk insert
//         //   console.log("Data inserted into MongoDB ✅");
//         // } catch (err) {
//         //   console.error("Error inserting into MongoDB:", err);
//         //   return res.status(500).json({
//         //     success: false,
//         //     message: "Error inserting data into MongoDB",
//         //     error: err.message,
//         //   });
//         // }
    

//         // Send a success response back to the client



//         res.status(200).json({
//           success: true,
//           message: 'File uploaded and processed successfully!',
//           rowCount: results.length,
//           data: results // You might send the processed data back, or just a summary
//         });
//       })
//       .on('error', (error) => {
//          // Handle any errors that occur during file reading
//          console.error('Error processing CSV:', error);
//          res.status(500).json({ success: false, message: 'Failed to process CSV file.' });
//       });

//   } catch (error) {
//     console.error('Error during file upload:', error);
//     res.status(500).json({
//       success: false,
//       message: 'An unexpected error occurred on the server.',
//     });
//   }
// };

// module.exports = {
//   handleFileUpload,
// };




// const fs = require("fs");
// const csv = require("csv-parser");
// // import schema
// const CreditRisk = require("../models/Entity");

// const handleFileUpload = (req, res) => {
//   try {
//     // Check if a file was uploaded by Multer
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file was uploaded.",
//       });
//     }

//     const results = [];
//     const filePath = req.file.path; // Path to the uploaded file

//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", (data) => {
//         results.push(data); // collect each row
//       })
//       .on("end", async () => {
//         console.log("CSV file successfully processed. Rows:", results.length);

//         try {
//           // Insert into MongoDB
//           await CreditRisk.insertMany(results);
//           console.log("Data inserted into MongoDB ✅");

//           // Delete file after processing
//         //  fs.unlinkSync(filePath);

//           // Send response
//           res.status(200).json({
//             success: true,
//             message: "File uploaded and data saved to MongoDB successfully!",
//             data: results,
//             rowCount: results.length,
//           });
//         } catch (err) {
//           console.error("Error inserting into MongoDB:", err);
//           return res.status(500).json({
//             success: false,
//             message: "Error inserting data into MongoDB",
//             error: err.message,
//           });
//         }
//       })
//       .on("error", (error) => {
//         console.error("Error processing CSV:", error);
//         res
//           .status(500)
//           .json({ success: false, message: "Failed to process CSV file." });
//       });
//   } catch (error) {
//     console.error("Error during file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "An unexpected error occurred on the server.",
//     });
//   }
// };

// module.exports = {
//   handleFileUpload,
// };


// this on e is working 



// const fs = require("fs");
// const csv = require("csv-parser");
// const CreditRisk = require("../models/Entity");

// const handleFileUpload = (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file was uploaded." });
//     }

//     const results = [];
//     const filePath = req.file.path;

//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", (data) => {
//         results.push(data);
//       })
//       .on("end", async () => {
//         console.log(`CSV file successfully processed. Found ${results.length} rows.`);

//         try {
//           // Optional: Clear the collection before inserting new data
//           // await CreditRisk.deleteMany({});
          
//           // Insert the array of data from the CSV into MongoDB
//           await CreditRisk.insertMany(results);
//           console.log("Data inserted into MongoDB ✅");

//           // Clean up by deleting the temporary file
//           fs.unlinkSync(filePath);

//           res.status(200).json({
//             success: true,
//             data: results,
//             message: `File uploaded and ${results.length} records saved to MongoDB successfully!`,
//           });
//         } catch (err) {
//           // Clean up the file even if there's a database error
//           fs.unlinkSync(filePath);
//           console.error("Error inserting into MongoDB:", err);
//           return res.status(500).json({
//             success: false,
//             message: "Error inserting data into MongoDB. Please check data format.",
//             error: err.message,
//           });
//         }
//       })
//       .on("error", (error) => {
//         console.error("Error processing CSV:", error);
//         res.status(500).json({ success: false, message: "Failed to process CSV file." });
//       });
//   } catch (error) {
//     console.error("Error during file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "An unexpected error occurred on the server.",
//     });
//   }
// };

// module.exports = {
//   handleFileUpload,
// };


const fs = require("fs");
const csv = require("csv-parser");
const CreditRisk = require("../models/Entity");

const handleFileUpload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file was uploaded." });
    }

    const results = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        console.log(`CSV file successfully processed. Found ${results.length} rows.`);

        try {
          // ✅ Delete all existing records before inserting new ones
          await CreditRisk.deleteMany({});
          console.log("Old records deleted from MongoDB ⚡");

          // Insert new data
          await CreditRisk.insertMany(results);
          console.log("New data inserted into MongoDB ✅");

          // Clean up temporary uploaded file
          fs.unlinkSync(filePath);

          res.status(200).json({
            success: true,
            data: results,
            message: `Old records cleared. ${results.length} new records saved successfully!`,
          });
        } catch (err) {
          // Always clean up file even on error
          fs.unlinkSync(filePath);
          console.error("Error inserting into MongoDB:", err);
          return res.status(500).json({
            success: false,
            message: "Error inserting data into MongoDB. Please check data format.",
            error: err.message,
          });
        }
      })
      .on("error", (error) => {
        console.error("Error processing CSV:", error);
        res.status(500).json({ success: false, message: "Failed to process CSV file." });
      });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred on the server.",
    });
  }
};

module.exports = {
  handleFileUpload,
};





// const fs = require("fs");
// const path = require("path");
// const axios = require("axios");
// const FormData = require("form-data");
// const CreditRisk = require("../models/Entity"); // Your MongoDB model
// const csv = require("csv-parser");
// // Configuration
// const AI_MODEL_URL = "http://localhost:5000"; // Your Python AI API

// const handleFileUpload = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file was uploaded.",
//       });
//     }

//     console.log(`Processing file: ${req.file.filename}`);
//     console.log(`File size: ${req.file.size} bytes`);

//     // Step 1: Send file to AI model for prediction
//     console.log("Sending file to AI model...");
    
//     const formData = new FormData();
//     const fileStream = fs.createReadStream(req.file.path);
//     formData.append('file', fileStream, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype
//     });

//     // Call AI API
//     // const aiResponse = await axios.post(${AI_MODEL_URL}/predict, formData, {
//     //   headers: {
//     //     ...formData.getHeaders(),
//     //   },
//     //   timeout: 300000, // 5 minutes timeout
//     // });
//      const aiResponse=await axios.post(`${AI_MODEL_URL}/predict`, formData, {
//   headers: {
//     ...formData.getHeaders(),
//   },
//   timeout: 300000, // 5 minutes timeout
// });


//     if (aiResponse.data.success) {
//       console.log("AI prediction successful!");
//       console.log(`Processed ${aiResponse.data.total_records} records`);
//       console.log(`Predictions:, aiResponse.data.predictions`);

//       // Step 2: Download the result file with predictions
//      const downloadUrl = `${AI_MODEL_URL}${aiResponse.data.download_url}`;

//       const resultResponse = await axios.get(downloadUrl, {
//         responseType: 'arraybuffer'
//       });

//       // Step 3: Save the result file locally (optional)
//       const resultFileName = `result_${Date.now()}_${path.parse(req.file.originalname).name}.csv`;

//       const resultFilePath = path.join('results', resultFileName);
      
//       // Create results directory if it doesn't exist
//       if (!fs.existsSync('results')) {
//         fs.mkdirSync('results', { recursive: true });
//       }

//       fs.writeFileSync(resultFilePath, resultResponse.data);
//       console.log(`Result file saved: ${resultFilePath}`);

//       // Step 4: Parse the result Excel file and save to MongoDB
//       console.log("Processing result file for MongoDB...");
      
//       // You'll need to parse the Excel file to get the data
//       // For now, I'll show you how to structure the response
      
//       // Clean up uploaded file
//       fs.unlinkSync(req.file.path);

//       // Step 5: Parse the result CSV file and save to MongoDB
//       console.log("Processing result CSV file for MongoDB...");
      
//       const results = [];
      
//       // Parse the CSV result file
//       fs.createReadStream(resultFilePath)
//         .pipe(csv())
//         .on("data", (data) => {
//           results.push(data);
//         })
//         .on("end", async () => {
//           try {
//             console.log(`Parsed ${results.length} rows from result CSV`);

            
//             // Clear old records and insert new ones with predictions
//             await CreditRisk.deleteMany({});
//             console.log("Old records cleared from MongoDB");

//             await CreditRisk.insertMany(results);
//             console.log("New records with predictions saved to MongoDB");

//             res.status(200).json({
//               success: true,
//               message: `File processed successfully! ${aiResponse.data.total_records} records analyzed and saved to database.`,

//               data: {
//                 total_records: aiResponse.data.total_records,
//                 predictions: aiResponse.data.predictions,
//                 result_file: resultFileName,
//                 database_records: results.length
//               },
//               ai_response: aiResponse.data
//             });

//           } catch (dbError) {
//             console.error("Error saving to MongoDB:", dbError);
//             return res.status(500).json({
//               success: false,
//               message: "AI prediction successful, but error saving to database",
//               error: dbError.message,
//               ai_data: aiResponse.data
//             });
//           }
//         })
//         .on("error", (csvError) => {
//           console.error("Error parsing CSV:", csvError);
//           return res.status(500).json({
//             success: false,
//             message: "AI prediction successful, but error parsing result CSV",
//             error: csvError.message,
//             ai_data: aiResponse.data
//           });
//         });

//     } else {
//       throw new Error("AI model returned error: " + aiResponse.data.error);
//     }

//   } catch (error) {
//     console.error("Error processing file:", error.message);
    
//     // Clean up uploaded file in case of error
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }

//     // Check if it's an AI API error
//     if (error.response && error.response.data) {
//       return res.status(500).json({
//         success: false,
//         message: "AI model error",
//         error: error.response.data.error || error.message,
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "An unexpected error occurred during file processing.",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   handleFileUpload,
// };