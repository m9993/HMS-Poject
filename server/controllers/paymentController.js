const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../middlewares/validate-request");
const paymentService = require("../services/paymentService");
const authorize = require("../middlewares/authorize");

// routes
router.get("/get-all", authorize, getAll);
router.get("/approve/:id", authorize, approve);

module.exports = router;

function getAll(req, res, next) {
  paymentService
    .getAll()
    .then((data) => res.json({ ...data }))
    .catch((err) => res.json({ success: false, error: err }));
}

function approve(req, res, next) {
  paymentService
    .approve(req.params.id)
    .then((data) => res.json({ ...data }))
    .catch((err) => res.json({ success: false, error: err }));
}
