import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { postData } from "../../../service";

export default function SeatCreateModal(props) {
  const [inputs, setInputs] = useState({});
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
  const submit = async () => {
    const res = await postData("/seat/add", inputs);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    props.loadData();
    closeModal();
  };
  return (
    <Modal
      isOpen={props.isAddModalVisible}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Seat"
    >
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h5>Seat Setup</h5>
        <button onClick={closeModal} type="button" className="btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="d-flex flex-column">
        <input
          className="form-control my-1"
          type="text"
          placeholder="Building"
          onChange={(e) => setInputs({ ...inputs, building: e.target.value })}
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Floor"
          onChange={(e) => setInputs({ ...inputs, floor: e.target.value })}
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Room"
          onChange={(e) => setInputs({ ...inputs, room: e.target.value })}
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Code"
          onChange={(e) => setInputs({ ...inputs, code: e.target.value })}
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Rent"
          onChange={(e) => setInputs({ ...inputs, rent: e.target.value })}
        />
        <button className="btn btn-primary mt-2" type="submit" onClick={submit}>
          OK
        </button>
      </div>
    </Modal>
  );
}
