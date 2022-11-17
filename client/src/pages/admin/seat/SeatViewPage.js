import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../../service/index";
import SeatCreateModal from "./SeatCreateModal";
import SeatEditModal from "./SeatEditModal";

export default function SeatViewPage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await getData("/seat/get-all");
    setData(res.seats);
  };
  const _delete = async (id) => {
    const res = await postData(`/seat/delete/${id}`);
    toast.success(res.message);
    loadData();
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="container">
        <h3 className="mt-5">Seat</h3>
        <button className="btn" onClick={() => setIsAddModalVisible(true)}>
          <h6>
            <i className="fa-solid fa-plus bg-primary text-white p-2 rounded"></i>
          </h6>
        </button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Code</th>
              <th scope="col">Building</th>
              <th scope="col">Floor</th>
              <th scope="col">Room</th>
              <th scope="col">Rent</th>
              <th scope="col">Is Available</th>
              <th scope="col">Created At</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.code}</td>
                <td>{item.building}</td>
                <td>{item.floor}</td>
                <td>{item.room}</td>
                <td>
                  {item.rent}{" "}
                  <i className="fa-sharp fa-solid fa-bangladeshi-taka-sign"></i>
                </td>
                <td>
                  {item.isAvailable ? (
                    <i className="fa-solid fa-circle-check text-success"></i>
                  ) : (
                    <i className="fa-regular fa-circle-xmark text-danger"></i>
                  )}
                </td>
                <td>
                  {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>
                  {item.assignedUsers.length >= 1
                    ? item.assignedUsers[item.assignedUsers.length - 1]?.name
                    : "-"}
                </td>
                <td>
                  <button
                    onClick={() => {
                      setEditData(item);
                      setIsEditModalVisible(true);
                    }}
                    type="button"
                    className="btn btn-link"
                  >
                    <i className="fa-solid fa-pen-to-square text-warning"></i>
                  </button>
                  |
                  <button
                    onClick={() => _delete(item.id)}
                    type="button"
                    className="btn btn-link"
                  >
                    <i className="fa-solid fa-trash-can text-danger"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SeatCreateModal
        setIsAddModalVisible={setIsAddModalVisible}
        isAddModalVisible={isAddModalVisible}
        loadData={loadData}
      />
      <SeatEditModal
        setIsEditModalVisible={setIsEditModalVisible}
        isEditModalVisible={isEditModalVisible}
        editData={editData}
        setEditData={setEditData}
        loadData={loadData}
      />
    </>
  );
}
