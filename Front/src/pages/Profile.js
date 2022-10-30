import Icon from "../assets/Icon.png";
import Container from "react-bootstrap/Container";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { API } from "../config/api";
import { useQuery } from "react-query";
import toRupiah from "@develoka/angka-rupiah-js";

function Profile() {
  const navigate = useNavigate();

  const navigateEditProfile = () => {
    navigate("/edit-my-profile");
  };

  useEffect(() => {
    document.title = "My Profile";
  }, []);

  const [state] = useContext(UserContext);

  let { data: transactions } = useQuery("mytransactions1Cache", async () => {
    const response = await API.get("/my-transactions");
    const response2 = response.data.data.filter(
      (p) => p.buyer_id == state.user.id
    );
    return response2;
  });

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ marginTop: "10px" }}
      >
        <div className="m-5" style={{ width: "90%" }}>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="d-flex flex-column">
                <h3 className="fw-bold mb-4">My Profile</h3>
                {state.user.image === "http://localhost:5000/uploads/" ? (
                  <img
                    src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                    width="200"
                    height="200"
                    alt="logo"
                    className="mb-4"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <img
                    src={state.user.image}
                    width="200"
                    height="200"
                    alt="logo"
                    className="mb-4"
                    style={{ objectFit: "cover" }}
                  />
                )}
                <Button
                  style={{ backgroundColor: "#433434", border: "none" }}
                  onClick={navigateEditProfile}
                >
                  Edit Profile
                </Button>
              </div>
              <div className="ms-4" style={{ marginTop: "55px" }}>
                <p style={{ color: "#613D2B" }}>Full Name</p>
                <p style={{ marginTop: "-12px" }}>{state.user.fullName}</p>
                <p style={{ color: "#613D2B" }}>Email</p>
                <p style={{ marginTop: "-12px" }}>{state.user.email}</p>
                <p style={{ color: "#613D2B" }}>Phone</p>
                <p style={{ marginTop: "-12px" }}>{state.user.phone}</p>
              </div>
            </div>
            <div style={{ width: "45%" }}>
              <h3 className="fw-bold mb-4">History Transaction</h3>
              <div
                style={{
                  overflowY: "scroll",
                  height: "400px",
                }}
              >
                {transactions?.map((p) => (
                  <div
                    style={{ backgroundColor: "white" }}
                    className="p-3 d-flex justify-content-between my-3"
                  >
                    <div>
                      <p
                        className="fw-bold"
                        style={{ wordBreak: "break-all", width: "90%" }}
                      >
                        {p.product}
                      </p>
                      <p style={{ marginTop: "-12px", fontSize: "13px" }}>
                        <span>{p.date}</span>
                      </p>
                      <p
                        style={{ fontSize: "13px", marginBottom: "0px" }}
                        className="fw-bold"
                      >
                        Total : {toRupiah(p.value, { dot: ",", floatingPoint: 0 })}
                      </p>
                    </div>
                    <div>
                      <img src={Icon} width="130" alt="logo" />
                      <br></br>

                      {p.status === "Pending" ? (
                        <Button
                          className="py-0 px-5"
                          style={{
                            fontSize: "12px",
                            marginBottom: "-35px",
                            backgroundColor: "#E74C3C",
                            color: "white",
                            border: "none",
                          }}
                        >
                          {p.status}
                        </Button>
                      ) : (
                        <Button
                          className="py-0 px-5"
                          style={{
                            fontSize: "12px",
                            marginBottom: "-35px",
                            backgroundColor: "#2ECC71",
                            color: "white",
                            border: "none",
                            width: "145px",
                          }}
                        >
                          {p.status}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
