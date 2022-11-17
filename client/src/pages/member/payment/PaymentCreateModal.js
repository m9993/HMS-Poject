import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getData, postData } from "../../../service";

export default function PaymentCreateModal(props) {
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
  const getMyRent = async () => {
    const res = await getData("/user/get-my-rent");
    setInputs({ ...inputs, rent: res.rent });
  };
  const submit = async () => {
    const res = await postData("/payment/pay", inputs);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    props.loadData();
    closeModal();
  };

  useEffect(() => {
    getMyRent();
  }, []);

  return (
    <Modal
      isOpen={props.isAddModalVisible}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Pay"
    >
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h5>Pay</h5>
        <button onClick={closeModal} type="button" className="btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="d-flex flex-column">
        Amount to pay
        <h5 className="text-center my-3"> {inputs.rent} ৳</h5>
        <div className="d-flex my-3">
          <button
            className="btn"
            onClick={() => setInputs({ ...inputs, method: 1 })}
          >
            <img
              src={require("../../../assets/bkash.png")}
              className={`p-1 border ${inputs.method == 1 && "border-primary"}`}
              height={40}
              width={80}
            />
          </button>
          <button
            className="btn"
            onClick={() => setInputs({ ...inputs, method: 2 })}
          >
            <img
              src={require("../../../assets/nagad.png")}
              className={`p-1 border ${inputs.method == 2 && "border-primary"}`}
              height={40}
              width={80}
            />
          </button>
          <button
            className="btn"
            onClick={() => setInputs({ ...inputs, method: 3 })}
          >
            <img
              src={require("../../../assets/rocket.jpg")}
              className={`p-1 border ${inputs.method == 3 && "border-primary"}`}
              height={40}
              width={80}
            />
          </button>
          <button
            className="btn"
            onClick={() => setInputs({ ...inputs, method: 4 })}
          >
            <img
              src={require("../../../assets/bank.png")}
              className={`p-1 border ${inputs.method == 4 && "border-primary"}`}
              height={40}
              width={80}
            />
          </button>
          <button
            className="btn"
            onClick={() => setInputs({ ...inputs, method: 5 })}
          >
            <img
              src={require("../../../assets/manual.png")}
              className={`p-1 border ${inputs.method == 5 && "border-primary"}`}
              height={40}
              width={80}
            />
          </button>
        </div>
        <button className="btn btn-primary mt-2" type="submit" onClick={submit}>
          OK
        </button>
      </div>
    </Modal>
  );
}
