const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../middlewares/validate-request");
const paymentService = require("../services/paymentService");
const authorize = require("../middlewares/authorize");

// routes
router.get("/get-all", authorize, getAll);
router.get("/get-my-payments", authorize, getMyPayments);
router.get("/approve/:id", authorize, approve);
router.post("/pay", authorize, paySchema, pay);

module.exports = router;

function getAll(req, res, next) {
  paymentService
    .getAll()
    .then((data) => res.json({ ...data }))
    .catch((err) => res.json({ success: false, error: err }));
}

function getMyPayments(req, res, next) {
  paymentService
    .getMyPayments(req.user)
    .then((data) => res.json({ ...data }))
    .catch((err) => res.json({ success: false, error: err }));
}

function approve(req, res, next) {
  paymentService
    .approve(req.params.id)
    .then((data) => res.json({ ...data }))
    .catch((err) => res.json({ success: false, error: err }));
}

function paySchema(req, res, next) {
  const schema = Joi.object({
    method: Joi.number().integer().required(),
  });
  validateRequest(req, res, next, schema);
}

function pay(req, res, next) {
  paymentService
    .pay(req.body, req.user)
    .then((data) => res.json({ ...data }))
    .catch((err) => res.json({ success: false, error: err }));
}
