
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middlewares/validate-request');
const userService = require('../services/userService');
const authorize = require('../middlewares/authorize');

// routes
router.post('/login', loginSchema, login);
router.post('/register', authorize, registerSchema, register);
router.post('/edit/:id', authorize, editSchema, edit);
router.post('/delete/:id', authorize, _delete);
router.get('/get-all', authorize, getAll);
router.get('/search', authorize, search);

module.exports = router;

function loginSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
    });
    validateRequest(req, res, next, schema);
}

function login(req, res, next) {
    userService.login(req.body)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        phone: Joi.string().required(),
        nid: Joi.string().required(),
        seatId: Joi.number().integer().required(),
    });
    validateRequest(req, res, next, schema);
}

function register(req, res, next) {
    userService.register(req.body)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function editSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        nid: Joi.string().required(),
        seatId: Joi.number().integer().required(),
    });
    validateRequest(req, res, next, schema);
}

function edit(req, res, next) {
    userService.edit(req.params.id, req.body)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function _delete(req, res, next) {
    userService._delete(req.params.id)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function search(req, res, next) {
    userService.search(req.query.key)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}