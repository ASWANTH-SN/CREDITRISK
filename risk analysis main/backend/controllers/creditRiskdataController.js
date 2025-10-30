const CreditRisk = require("../models/Entity");
exports.getSummary = async (req, res) => {
  try {
    // Total unique entities
    const totalRecords = (await CreditRisk.distinct("entity_id")).length;

    // Unique entities per risk bucket
    const highRisk = (await CreditRisk.distinct("entity_id", { risk_bucket: "High" })).length;
    const mediumRisk = (await CreditRisk.distinct("entity_id", { risk_bucket: "Medium" })).length;
    const lowRisk = (await CreditRisk.distinct("entity_id", { risk_bucket: "Low" })).length;

    // Top 5 risky entities (by highest PD_1y_pct)
    // Group by entity_id to avoid duplicates
    const topRiskyCustomers = await CreditRisk.aggregate([
      {
        $sort: { PD_1y_pct: -1 } // sort by PD_1y_pct descending
      },
      {
        $group: {
          _id: "$entity_id",
          entity_name: { $first: "$entity_name" },
          sector: { $first: "$sector" },
          country: { $first: "$country" },
          PD_1y_pct: { $first: "$PD_1y_pct" }
        }
      },
      { $limit: 5 } // take top 5 unique entities
    ]);

    res.json({
      totalRecords,
      highRisk,
      mediumRisk,
      lowRisk,
      topRiskyCustomers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
