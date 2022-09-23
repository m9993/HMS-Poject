
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middlewares/validate-request');
const authService = require('../services/authService');
const authorize = require('../middlewares/authorize');

// routes
router.post('/register', registerSchema, register);
router.get('/get-all-users', getAllUsers);
router.delete('/remove-user/:id', removeUser);
router.put('/update-user/:id', updateUserSchema, updateUser);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        // password: Joi.string().min(4).required(),
        // confirmPassword: Joi.string().required().valid(Joi.ref('password')),
        email: Joi.string().email().required(),
    });
    validateRequest(req, res, next, schema);
}

function register(req, res, next) {
    authService.register(req.body)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function getAllUsers(req, res, next) {
    authService.getAllUsers(req.body)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function removeUser(req, res, next) {
    authService.removeUser(req.params.id)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

function updateUserSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        isActive: Joi.boolean(),
    });
    validateRequest(req, res, next, schema);
}

function updateUser(req, res, next) {
    authService.updateUser(req.body, req.params.id)
        .then(data => res.json({ ...data }))
        .catch(err => res.json({ success: false, error: err }));
}

