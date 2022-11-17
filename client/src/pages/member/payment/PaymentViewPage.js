import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../../service/index";
import PaymentCreateModal from "./PaymentCreateModal";

export default function PaymentViewPage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await getData("/payment/get-my-payments");
    setData(res.payments);
  };
  const getPaidMethodName = (id) => {
    if (id == 1) return "BKash";
    if (id == 2) return "Nagad";
    if (id == 3) return "Rocket";
    if (id == 4) return "Bank";
    if (id == 5) return "Manual";
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="container">
        <h3 className="mt-5">Payments</h3>
        <button className="btn" onClick={() => setIsAddModalVisible(true)}>
          <h6>
            <i className="fa-solid fa-plus bg-primary text-white p-2 rounded"></i>
          </h6>
        </button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Seat</th>
              <th scope="col">Amount</th>
              <th scope="col">Method</th>
              <th scope="col">Paid At</th>
              <th scope="col">Approval</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.paidBy.assignedSeat.code}</td>
                <td>{item.paidBy.assignedSeat.rent} ৳</td>
                <td>{getPaidMethodName(item.method)}</td>
                <td>
                  {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>

                <td>
                  {item.isApproved ? (
                    <i className="fa-solid fa-circle-check text-success"></i>
                  ) : (
                    <i className="fa-regular fa-circle-xmark text-danger"></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaymentCreateModal
        setIsAddModalVisible={setIsAddModalVisible}
        isAddModalVisible={isAddModalVisible}
        loadData={loadData}
      />
    </>
  );
}
