import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../../service/index";
import UserCreateModal from "./UserCreateModal";
import UserEditModal from "./UserEditModal";

export default function UserViewPage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await getData("/user/get-all");
    setData(res.users);
  };
  const searchData = async (key) => {
    const res = await getData(`/user/search?key=${key}`);
    setData(res.users);
  };
  const _delete = async (id, type) => {
    if (type == 1) {
      toast.error("Admin can not be removed.");
      return;
    }
    const res = await postData(`/user/delete/${id}`);
    toast.success(res.message);
    loadData();
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="container">
      <h3 className="mt-5">User</h3>
        <input
          className="form-control my-3"
          type="text"
          placeholder="Seach"
          onChange={(e) => searchData(e.target.value)}
        />
        <button className="btn" onClick={() => setIsAddModalVisible(true)}>
          <h6>
            <i className="fa-solid fa-plus bg-primary text-white p-2 rounded"></i>
          </h6>
        </button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Type</th>
              <th scope="col">NID</th>
              <th scope="col">Created At</th>
              <th scope="col">Assigned Seat</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.type == 1 ? "Admin" : "Member"}</td>
                <td>{item.nid}</td>
                <td>
                  {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>{item.assignedSeat?.code}</td>
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
                    onClick={() => _delete(item.id, item.type)}
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

      <UserCreateModal
        setIsAddModalVisible={setIsAddModalVisible}
        isAddModalVisible={isAddModalVisible}
        loadData={loadData}
      />
      <UserEditModal
        setIsEditModalVisible={setIsEditModalVisible}
        isEditModalVisible={isEditModalVisible}
        editData={editData}
        setEditData={setEditData}
        loadData={loadData}
      />
    </>
  );
}
