import Container from "react-bootstrap/Container";
import Icon from "../assets/Icon.png";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function ProfilePartner() {
  const navigate = useNavigate();

  const navigateEditProfilePartner = () => {
    navigate("/edit-profile-partner");
  };

  const navigateTransaction = () => {
    navigate("/transaction");
  };

  useEffect(() => {
    document.title = "My Profile Partner";
  }, []);

  const [state] = useContext(UserContext);

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
                <h3 className="fw-bold mb-4">Profile Partner</h3>
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
                  onClick={navigateEditProfilePartner}
                >
                  Edit Profile
                </Button>
              </div>
              <div className="ms-4" style={{ marginTop: "55px" }}>
                <p style={{ color: "#613D2B" }}>Name Partner</p>
                <p style={{ marginTop: "-12px" }}>{state.user.fullName}</p>
                <p style={{ color: "#613D2B" }}>Email</p>
                <p style={{ marginTop: "-12px" }}>{state.user.email}</p>
                <p style={{ color: "#613D2B" }}>Phone</p>
                <p style={{ marginTop: "-12px" }}>{state.user.phone}</p>
              </div>
            </div>
            <div style={{ width: "45%" }}>
              <h3 className="fw-bold mb-4">History Order</h3>
              <div
                style={{ backgroundColor: "white" }}
                className="p-3 d-flex justify-content-between"
              >
                <div>
                  <p className="fw-bold">Andi</p>
                  <p style={{ marginTop: "-12px", fontSize: "13px" }}>
                    <strong>Saturday</strong>, 12 March 2021
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      marginBottom: "0px",
                      color: "#974A4A",
                    }}
                    className="fw-bold"
                  >
                    Total : Rp 45.000
                  </p>
                </div>
                <div>
                  <img src={Icon} width="130" alt="logo" />
                  <br></br>
                  <Button
                    className="py-0 px-5"
                    style={{
                      fontSize: "12px",
                      marginBottom: "-35px",
                      backgroundColor: "#E5FFF2",
                      color: "#00FF47",
                      border: "none",
                    }}
                    onClick={navigateTransaction}
                  >
                    Finished
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProfilePartner;
