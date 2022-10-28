import Pizza from "../assets/pizza.png";
import Line from "../assets/garis.png";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";

function Page() {
  const navigate = useNavigate();

  const navigateDetail = () => {
    navigate("/detail-restaurant");
  };

  useEffect(() => {
    document.title = "Ways Food";
  }, []);

  let { data: admins } = useQuery("adminLPCache", async () => {
    const response = await API.get("/admins");
    return response.data.data;
  });

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ backgroundColor: "#FFC700", marginBottom: "60px" }}
      >
        <div className="m-5">
          <h1 className="fw-bold">Are You Hungry?</h1>
          <h1 className="fw-bold">Express Home Delivery</h1>
          <div className="d-flex">
            <img src={Line} alt="pizza" className="mt-5 align-self-start" />
            <p
              style={{ width: "300px", fontSize: "13px", marginTop: "40px" }}
              className="ms-4"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
        <img src={Pizza} width="400px" alt="pizza" className="m-5" />
      </div>
      <div className="mx-auto" style={{ width: "80%" }}>
        <h3 className="fw-bold">Popular Restaurant</h3>
      </div>
      <div
        className="my-4 mx-auto"
        style={{
          width: "85%",
          overflowY: "scroll",
          overflowX: "hidden",
          height: "400px",
        }}
      >
        <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
          {admins?.map((p) => (
            <div
              className="my-4 p-3 rounded mx-3"
              style={{
                backgroundColor: "white",
                width: "20%",
                cursor: "pointer",
              }}
              key={p.id}
              onClick={navigateDetail}
            >
              {p.image == "https://localhost:5000/uploads/" ? (
                <img src={p.image} alt="" />
              ) : (
                <img
                  src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                  alt=""
                  width="60px"
                  height="60px"
                  style={{ borderRadius: "50%" }}
                />
              )}
              <span className="fw-bold ms-3" style={{ fontSize: "18px" }}>
                {p.fullName}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4 mx-auto" style={{ width: "75%" }}></div>
    </div>
  );
}

export default Page;
