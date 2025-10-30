// const CreditRisk = require("../models/creditRiskModel");

// /**
//  * Fetches all entities that are classified as 'High' risk.
//  */
// const getHighRiskEntities = async (req, res) => {
//   try {
//     // We now only look for entries with the exact value 'High'
//     const highRiskCategories = ['High'];

//     // The rest of the logic remains the same.
//     // The query now finds documents where risk_bucket is in the ['High'] array.
//     const highRiskEntries = await CreditRisk.find({
//       risk_bucket: { $in: highRiskCategories }
//     });

//     if (!highRiskEntries || highRiskEntries.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: "No entities with a 'High' risk bucket were found.",
//         data: []
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: highRiskEntries.length,
//       data: highRiskEntries
//     });

//   } catch (error) {
//     console.error("Error fetching high-risk data:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching high-risk entities."
//     });
//   }
// };

// module.exports = {
//   getHighRiskEntities,
// };






const CreditRisk = require("../models/Entity");

// Get all high risk entries


// Get distinct high risk entries based on entity_id
exports.getHighRiskEntries = async (req, res) => {
  try {
    const results = await CreditRisk.aggregate([
      { $match: { risk_bucket: "High" } },
      { $group: { 
          _id: "$entity_id", 
          entity_name: { $first: "$entity_name" },
          sector: { $first: "$sector" },
          country: { $first: "$country" },
          revenue_usd_m: { $first: "$revenue_usd_m" },
          risk_bucket: { $first: "$risk_bucket" },
          implied_rating: { $first: "$implied_rating" }
        } 
      }
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch distinct high risk entries" });
  }
};
