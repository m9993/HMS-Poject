import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { postData } from "../../../service";

export default function SeatCreateModal(props) {
  console.log(props.editData);
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
  const submit = async () => {
    const res = await postData(
      `/seat/edit/${props.editData.id}`,
      props.editData
    );
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
      isOpen={props.isEditModalVisible}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Seat"
    >
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h5>Seat Edit</h5>
        <button onClick={closeModal} type="button" className="btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="d-flex flex-column">
        <input
          className="form-control my-1"
          type="text"
          placeholder="Building"
          value={props.editData.building}
          onChange={(e) =>
            props.setEditData({ ...props.editData, building: e.target.value })
          }
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Floor"
          value={props.editData.floor}
          onChange={(e) =>
            props.setEditData({ ...props.editData, floor: e.target.value })
          }
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Room"
          value={props.editData.room}
          onChange={(e) =>
            props.setEditData({ ...props.editData, room: e.target.value })
          }
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Code"
          value={props.editData.code}
          onChange={(e) =>
            props.setEditData({ ...props.editData, code: e.target.value })
          }
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Rent"
          value={props.editData.rent}
          onChange={(e) =>
            props.setEditData({ ...props.editData, rent: e.target.value })
          }
        />
        <div className="form-check form-switch mt-1">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={props.editData.isAvailable}
            onChange={(e) =>
              props.setEditData({
                ...props.editData,
                isAvailable: e.target.checked,
              })
            }
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Is Available
          </label>
        </div>
        <button className="btn btn-primary mt-2" type="submit" onClick={submit}>
          OK
        </button>
      </div>
    </Modal>
  );
}
