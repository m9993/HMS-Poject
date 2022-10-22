const model = require("../models");

module.exports = {
  add,
  edit,
  _delete,
  getAll,
};

async function add(params) {
  const isCodeExists = await model.Seat.findOne({
    where: { code: params.code },
  });
  if (isCodeExists)
    return {
      success: false,
      message: "Code already assigned!",
    };

  await model.Seat.create({
    ...params,
    isAvailable: true,
  });
  return {
    success: true,
    message: "Seat Added",
  };
}

async function edit(id, params) {
  const isExists = await model.Seat.findByPk(id);
  if (!isExists)
    return {
      success: false,
      message: "Not exists!",
    };

  await model.Seat.update(
    {
      ...params,
    },
    { where: { id: id } }
  );
  return {
    success: true,
    message: "Seat updated",
  };
}

async function _delete(id) {
  await model.Seat.destroy({ where: { id: id } });
  return {
    success: true,
    message: "Seat deleted",
  };
}

async function getAll() {
  const seats = await model.Seat.findAll({
    order:[['id','DESC']],
    include: [
      {
        model: model.User,
        as: "assignedUsers",
      },
    ],
  });
  return {
    success: true,
    seats,
  };
}
