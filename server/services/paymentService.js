const model = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getAll,
  getMyPayments,
  approve,
  pay,
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

async function getMyPayments(authUser) {
  const payments = await model.Payment.findAll({
    where: { userId: authUser.id },
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

async function pay(params, authUser) {
  await model.Payment.create({
    method: params.method,
    isApproved: false,
    userId: authUser.id,
  });
  return {
    success: true,
    message: "Paid! Waiting for approval.",
  };
}
