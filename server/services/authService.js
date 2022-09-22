const model = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config.json');

module.exports = {
    register,
    getAllUsers,
    removeUser,
    updateUser
};

async function register(params) {
    const isEmailExists = await model.User.findOne({
        where: { email: params.email }
    })

    if (isEmailExists) return {
        success: false,
        message: `Email '${params.email}' already taken.`
    }

    await model.User.create({
        firstName: params.firstName,
        lastName: params.lastName,
        password: await bcrypt.hash(params.password, 10),
        email: params.email,
        isActive: true,
    });

    return {
        success: true,
        message: 'Successfully registered.'
    }
}

async function getAllUsers(params) {
    const data = await model.User.findAll()

    return {
        success: true,
        data
    }
}

async function removeUser(id) {
    await model.User.destroy({ where: { id } })
    return {
        success: true,
        message: "Successfully deleted."
    }
}

async function updateUser(params,id) {
    await model.User.update({
        ...params
    },
        { where: { id } })
    return {
        success: true,
        message: "Successfully updated."
    }
}