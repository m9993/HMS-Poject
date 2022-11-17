const model = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config.json");
const { Op } = require("sequelize");

module.exports = {
  login,
  register,
  edit,
  _delete,
  getAll,
  search,
  getMyRent,
};

async function login(params) {
  const user = await model.User.findOne({
    attributes: { include: ["password"] },
    where: { email: params.email },
  });
  if (!user)
    return {
      success: false,
      message: "No user registered with this email.",
    };

  const isPasswordVerified = await bcrypt.compare(
    params.password,
    user.password || ""
  );
  if (!isPasswordVerified)
    return {
      success: false,
      message: "Incorrect email or password.",
    };

  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "7d" });
  if (token) {
    return {
      success: true,
      token,
    };
  }
}

async function register(params) {
  const isExists = await model.User.findOne({ where: { email: params.email } });
  if (isExists)
    return {
      success: false,
      message: "Email already exists!",
    };

  await model.User.create({
    ...params,
    password: await bcrypt.hash(params.password, 10),
    type: 2,
  });

  await model.Seat.update(
    {
      isAvailable: false,
    },
    { where: { id: params.seatId } }
  );

  return {
    success: true,
    message: "User added",
  };
}

async function edit(id, params) {
  const user = await model.User.findByPk(id);

  await model.User.update(
    {
      ...params,
    },
    { where: { id: id } }
  );

  if (user.seatId != params.seatId) {
    await model.Seat.update(
      {
        isAvailable: true,
      },
      { where: { id: user.seatId } }
    );
    await model.Seat.update(
      {
        isAvailable: false,
      },
      { where: { id: params.seatId } }
    );
  }

  return {
    success: true,
    message: "User updated",
  };
}

async function _delete(id) {
  await model.User.destroy({ where: { id: id } });
  return {
    success: true,
    message: "User removed",
  };
}

async function getAll() {
  const users = await model.User.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: model.Seat,
        as: "assignedSeat",
      },
    ],
  });
  return {
    success: true,
    users,
  };
}

async function search(key) {
  const users = await model.User.findAll({
    order: [["id", "DESC"]],
    where: {
      [Op.or]: [
        { name: { [Op.substring]: key } },
        { address: { [Op.substring]: key } },
        { email: { [Op.substring]: key } },
        { phone: { [Op.substring]: key } },
        { nid: { [Op.substring]: key } },
      ],
    },
    include: [
      {
        model: model.Seat,
        as: "assignedSeat",
      },
    ],
  });
  return {
    success: true,
    users,
  };
}

async function getMyRent(authUser) {
  const { rent } = await model.Seat.findByPk(authUser.seatId);
  return {
    success: true,
    rent,
  };
}
