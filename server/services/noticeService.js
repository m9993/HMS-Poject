const model = require("../models");
const { Op } = require("sequelize");

module.exports = {
  publish,
  getAll,
  getMyNotices,
};

async function publish(params) {
  const notice = await model.Notice.create({
    title: params.title,
    description: params.description,
  });
  await notice.setToUsers(params.to);
  return {
    success: true,
    message: "Notice published",
  };
}

async function getAll() {
  const notices = await model.Notice.findAll({
    order:[['id','DESC']],
    include: [
      {
        model: model.User,
        as: "toUsers",
        through: {
          attributes: [],
          as: "moreInfo",
        },
      },
    ],
  });
  return {
    success: true,
    notices,
  };
}

async function getMyNotices(auth) {
  const notices = await model.Notice.findAll({
    order:[['id','DESC']],
    include: [
      {
        model: model.User,
        attributes: [],
        as: "toUsers",
        through: {
          attributes: [],
          as: "moreInfo",
        },
        where: { id: auth.id },
      },
    ],
  });
  return {
    success: true,
    notices,
  };
}
