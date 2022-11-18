import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getData, postData } from "../../../service";

export default function NoticeCreateModal(props) {
  const [inputs, setInputs] = useState({});
  const [isAllUsersChecked, setIsAllUsersChecked] = useState(false);
  const [searchKey, setSearchKey] = useState();
  const [userData, setUserData] = useState([]);

  const customStyles = {
    content: {
      // top: "50%",
      // left: "50%",
      // right: "auto",
      // bottom: "auto",
      // marginRight: "-50%",
      // transform: "translate(-50%, -50%)",
    },
  };
  const closeModal = () => {
    props.setIsAddModalVisible(false);
  };
  const fetchUsers = async () => {
    const res = await getData(`/user/get-all`);
    setUserData(res.users);
  };
  const fetchSearchUsers = async () => {
    const res = await getData(`/user/search?key=${searchKey}`);
    setUserData(res.users);
  };
  const submit = async () => {
    const res = await postData("/notice/publish", inputs);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    props.loadData();
    closeModal();
    setInputs({});
    setIsAllUsersChecked(false);
    setSearchKey("");
  };

  useEffect(() => {
    fetchSearchUsers();
  }, [searchKey]);
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Modal
      isOpen={props.isAddModalVisible}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Notice"
    >
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h5>Publish Notice</h5>
        <button onClick={closeModal} type="button" className="btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="d-flex flex-column">
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-2">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Title"
              aria-label="Title"
              onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            />
            <button type="button" className="btn btn-primary" onClick={submit}>
              Publish
            </button>
          </div>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className="d-flex align-items-center bg-warning rounded px-3 py-2">
          <div>To</div>
          <div className="form-check ms-5 mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              checked={isAllUsersChecked}
              onChange={async (e) => {
                setIsAllUsersChecked(e.target.checked);
                if (e.target.checked) {
                  await fetchUsers();
                  let to = [];
                  userData.forEach((i) => {
                    to.push(i.id);
                  });
                  setInputs({
                    ...inputs,
                    to,
                  });
                } else {
                  setInputs({
                    ...inputs,
                    to: [],
                  });
                }
              }}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Send to All
            </label>
          </div>
          <div className="w-25 ms-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search user"
              aria-label="Search user"
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center flex-wrap mt-5">
        {userData.map((item, index) => (
          <div key={index} className="d-flex align-items-center m-4">
            <input
              className="form-check-input"
              type="checkbox"
              value={item.id}
              id="flexCheckDefault"
              checked={inputs.to ? inputs.to.find((i) => i == item.id) : false}
              onChange={(e) => {
                setIsAllUsersChecked(false);
                if (e.target.checked) {
                  const to = inputs.to || [];
                  to.push(item.id);
                  setInputs({ ...inputs, to });
                } else {
                  let to = inputs.to || [];
                  const filtered = to.filter((i) => i != item.id);
                  setInputs({ ...inputs, to: filtered });
                }
              }}
            />
            <img
              src={`https://ui-avatars.com/api/?background=random&name=${item.name}`}
              className="rounded-circle ms-3 me-2"
              style={{ width: "40px" }}
              alt="Avatar"
            />
            <div>
              <div className="text-uppercase fw-semibold">{item.name}</div>
              <div className="fs-6 text-secondary">{item.email}</div>
              <div className="fs-6 text-secondary fst-italic">
                Seat:{" "}
                {item.assignedSeat ? item.assignedSeat.code : "Not assigned"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
