
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middlewares/validate-request');
const seatService = require('../services/seatService');
const authorize = require('../middlewares/authorize');

// routes
router.post('/add', authorize, addSchema, add);
router.post('/edit/:id', authorize, editSchema, edit);
router.post('/delete/:id', authorize, _delete);
router.get('/get-all', authorize, getAll);

module.exports = router;

function addSchema(req, res, next) {
    const schema = Joi.object({
        building: Joi.string().required(),
        floor: Joi.string().required(),
        room: Joi.string().required(),
        code: Joi.string().required(),
        rent: Joi.number().precision(3).required(),
    });
    validateRequest(req, res, next, schema);
}

function add(req, res, next) {
    seatService.add(req.body)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function editSchema(req, res, next) {
    const schema = Joi.object({
        building: Joi.string().required(),
        floor: Joi.string().required(),
        room: Joi.string().required(),
        code: Joi.string().required(),
        rent: Joi.number().precision(3).required(),
        isAvailable: Joi.boolean().required(),
    });
    validateRequest(req, res, next, schema);
}

function edit(req, res, next) {
    seatService.edit(req.params.id, req.body)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function _delete(req, res, next) {
    seatService._delete(req.params.id)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function getAll(req, res, next) {
    seatService.getAll()
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}