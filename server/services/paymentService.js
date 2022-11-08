const model = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getAll,
  approve,
};

async function getAll() {
  const payments = await model.Payment.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: model.User,
        as: "paidBy",
        include: [{ model: model.Seat, as: "assignedSeat" }],
      },
    ],
  });
  return {
    success: true,
    payments,
  };
}

async function approve(paymentId) {
  await model.Payment.update(
    { isApproved: true },
    { where: { id: paymentId } }
  );
  return {
    success: true,
    message: "Payment approved.",
  };
}
