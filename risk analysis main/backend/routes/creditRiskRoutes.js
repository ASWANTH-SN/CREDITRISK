// import express from 'express';
// const{getHighRiskEntities}=require('../controllers/creditRiskController');

// const router = express.Router();

// // Define the API route: GET /api/risk/high
// // When a GET request is made to this URL, the getHighRiskEntities function will run.
// router.get('/high', getHighRiskEntities);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { getHighRiskEntries } = require("../controllers/creditRiskController");

// Route for high risk entries
router.get("/high-risk", getHighRiskEntries);

module.exports = router;
