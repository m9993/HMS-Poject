import moment from "moment";
import React, { useEffect, useState } from "react";
import { getData } from "../../../service/index";
import NoticeCreateModal from "./NoticeCreateModal";

export default function NoticeViewPage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState([]);
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await getData("/notice/get-all");
    setData(res.notices);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="container">
        <h3 className="mt-5">Notices</h3>
        <button className="btn" onClick={() => setIsAddModalVisible(true)}>
          <h6>
            <i className="fa-solid fa-plus bg-primary text-white p-2 rounded"></i>
          </h6>
        </button>
        {data.map((item, index) => (
          <div key={index} className="border-bottom p-3">
            <h5>
              {index + 1}. {item.title}
            </h5>
            <div className="ms-3">{item.description}</div>
            <div className="ms-3 mt-1 ">
              {item.toUsers.map((i, index) => (
                <img
                  key={index}
                  src={`https://ui-avatars.com/api/?background=random&name=${i.name}`}
                  className="rounded-circle mx-1"
                  style={{ width: "22px" }}
                  alt="Avatar"
                />
              ))}
            </div>
            <div className="text-secondary mt-2 ms-3 fst-italic">
              {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
        ))}
      </div>

      <NoticeCreateModal
        setIsAddModalVisible={setIsAddModalVisible}
        isAddModalVisible={isAddModalVisible}
        loadData={loadData}
      />
    </>
  );
}
