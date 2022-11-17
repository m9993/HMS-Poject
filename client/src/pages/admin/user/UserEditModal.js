import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getData, postData } from "../../../service";

export default function UserEditModal(props) {
  const [seats, setSeats] = useState([]);

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
    props.setIsEditModalVisible(false);
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
    const res = await postData(
      `/user/edit/${props.editData.id}`,
      props.editData
    );
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    props.loadData();
    closeModal();
    fetchSeats()
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <Modal
      isOpen={props.isEditModalVisible}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit User"
    >
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h5>Edit User</h5>
        <button onClick={closeModal} type="button" className="btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="d-flex flex-column">
        <input
          className="form-control my-1"
          type="text"
          placeholder="Name"
          value={props.editData.name}
          onChange={(e) =>
            props.setEditData({ ...props.editData, name: e.target.value })
          }
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Address"
          value={props.editData.address}
          onChange={(e) =>
            props.setEditData({ ...props.editData, address: e.target.value })
          }
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Phone"
          value={props.editData.phone}
          onChange={(e) =>
            props.setEditData({ ...props.editData, phone: e.target.value })
          }
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="NID"
          value={props.editData.nid}
          onChange={(e) =>
            props.setEditData({ ...props.editData, nid: e.target.value })
          }
        />
        <select
          className="form-select my-1"
          aria-label="Default select example"
          value={props.editData.seatId}
          onChange={(e) =>
            props.setEditData({ ...props.editData, seatId: e.target.value })
          }
        >
          <option disabled selected value="">
            Select Seat
          </option>
          {seats.map((element) => (
            <option
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
