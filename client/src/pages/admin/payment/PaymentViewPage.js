import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../../service/index";

export default function PaymentViewPage() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await getData("/payment/get-all");
    setData(res.payments);
  };
  const approve = async (id) => {
    const res = await getData(`/payment/approve/${id}`);
    loadData()
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Seat</th>
              <th scope="col">Amount</th>
              <th scope="col">Paid By</th>
              <th scope="col">Method</th>
              <th scope="col">Paid At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.paidBy.assignedSeat.code}</td>
                <td>{item.paidBy.assignedSeat.rent} ৳</td>
                <td>{item.paidBy.name}</td>
                <td>{getPaidMethodName(item.method)}</td>
                <td>
                  {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>

                <td>
                  {item.isApproved ? (
                    <div>
                      {`Approved `}
                      <i className="fa-solid fa-circle-check text-success"></i>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {approve(item.id)}}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
