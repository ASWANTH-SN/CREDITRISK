

const mongoose = require("mongoose");



const CreditRiskSchema = new mongoose.Schema({

  entity_id: { type: String, required: true },

  entity_name: { type: String, required: true },

  sector: { type: String },

  country: { type: String },



  revenue_usd_m: { type: Number },

  ebitda_margin_pct: { type: Number },

  ebit_margin_pct: { type: Number },

  cash_usd_m: { type: Number },

  total_assets_usd_m: { type: Number },

  equity_usd_m: { type: Number },

  net_debt_usd_m: { type: Number },

  debt_to_equity: { type: Number },

  interest_expense_usd_m: { type: Number },

  interest_coverage: { type: Number },

  operating_cf_usd_m: { type: Number },

  capex_usd_m: { type: Number },

  fcf_usd_m: { type: Number },

  dscr: { type: Number },

  current_ratio: { type: Number },

  quick_ratio: { type: Number },



  dso_days: { type: Number },

  dpo_days: { type: Number },

  dio_days: { type: Number },

  revenue_cagr_3y_pct: { type: Number },

  years_in_operation: { type: Number },



  ownership_type: { type: String },

  auditor_tier: { type: String },

  governance_score_0_100: { type: Number },

  esg_controversies_3y: { type: Number },

  country_risk_0_100: { type: Number },



  industry_cyclicality: { type: String },

  fx_revenue_pct: { type: Number },

  hedging_policy: { type: String },

  collateral_coverage_pct: { type: Number },

  covenant_quality: { type: String },



  payment_incidents_12m: { type: Number },

  legal_disputes_open: { type: Number },

  sanctions_exposure: { type: String },

  financials_audited: { type: String },



  PD_1y_pct: { type: Number },

  LGD_pct: { type: Number },

  EAD_usd_m: { type: Number },



  risk_bucket: { type: String },

  implied_rating: { type: String }

});



module.exports = mongoose.model("CreditRisk", CreditRiskSchema);

