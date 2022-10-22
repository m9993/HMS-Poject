const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../middlewares/validate-request");
const noticeService = require("../services/noticeService");
const authorize = require("../middlewares/authorize");

// routes
router.post("/publish", authorize, publishSchema, publish);
router.get("/get-all", authorize, getAll);
router.get("/get-my-notices", authorize, getMyNotices);

module.exports = router;

function publishSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    to: Joi.array().required(),
  });
  validateRequest(req, res, next, schema);
}

function publish(req, res, next) {
  noticeService
    .publish(req.body)
    .then((data) => res.json({ ...data }))
    .catch((err) => res.json({ success: false, error: err }));
}

function getAll(req, res, next) {
  noticeService
    .getAll()
    .then((data) => res.json({ ...data }))
    .catch((err) => res.json({ success: false, error: err }));
}

function getMyNotices(req, res, next) {
  noticeService
    .getMyNotices(req.user)
    .then((data) => res.json({ ...data }))
    .catch((err) => res.json({ success: false, error: err }));
}
