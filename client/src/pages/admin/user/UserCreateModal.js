import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getData, postData } from "../../../service";

export default function UserCreateModal(props) {
  const [inputs, setInputs] = useState({});
  const [seats, setSeats] = useState([]);
  console.log(inputs);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const closeModal = () => {
    props.setIsAddModalVisible(false);
  };
  const fetchSeats = async () => {
    const res = await getData("/seat/get-all");
    let availableSeats = [];
    res.seats.forEach((element) => {
      if (element.isAvailable) {
        availableSeats.push(element);
      }
    });
    setSeats(availableSeats);
  };

  const submit = async () => {
    const res = await postData("/user/register", inputs);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    props.loadData();
    closeModal();
    fetchSeats();
    setInputs({});
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <Modal
      isOpen={props.isAddModalVisible}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add User"
    >
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h5>User Register</h5>
        <button onClick={closeModal} type="button" className="btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="d-flex flex-column">
        <input
          className="form-control my-1"
          type="text"
          placeholder="Name"
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Address"
          onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Email"
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Password"
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Phone"
          onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="NID"
          onChange={(e) => setInputs({ ...inputs, nid: e.target.value })}
        />
        <select
          className="form-select my-1"
          aria-label="Default select example"
          onChange={(e) => setInputs({ ...inputs, seatId: e.target.value })}
        >
          <option disabled selected value="">
            Select Seat
          </option>
          {seats.map((element, index) => (
            <option
              key={index}
              value={element.id}
            >{`Code: ${element.code} (${element.rent} ৳)`}</option>
          ))}
        </select>
        <button className="btn btn-primary mt-2" type="submit" onClick={submit}>
          OK
        </button>
      </div>
    </Modal>
  );
}
