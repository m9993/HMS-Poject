import moment from "moment";
import React, { useEffect, useState } from "react";
import { getData } from "../../../service/index";

export default function NoticeViewPage() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await getData("/notice/get-my-notices");
    setData(res.notices);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="container">
        <h3 className="mt-5">Notices</h3>
        {data.map((item, index) => (
          <div key={index} className="border-bottom p-3">
            <h5>
              {index + 1}. {item.title}
            </h5>
            <div className="ms-3">{item.description}</div>
            <div className="text-secondary mt-2 ms-3 fst-italic">
              {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
