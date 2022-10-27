import Icon from "../assets/Icon.png";
import PP1 from "../assets/fotoprofile1.png";
import Container from "react-bootstrap/Container";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const navigateEditProfile = () => {
    navigate("/edit-my-profile");
  };
  
  useEffect(() => {
    document.title = "My Profile";
  }, []);

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
                <img src={PP1} width="150" alt="logo" className="mb-4" />
                <Button
                  style={{ backgroundColor: "#433434", border: "none" }}
                  onClick={navigateEditProfile}
                >
                  Edit Profile
                </Button>
              </div>
              <div className="ms-4" style={{ marginTop: "55px" }}>
                <p style={{ color: "#613D2B" }}>Full Name</p>
                <p style={{ marginTop: "-12px" }}>Andi</p>
                <p style={{ color: "#613D2B" }}>Email</p>
                <p style={{ marginTop: "-12px" }}>andigans@gmail.com</p>
                <p style={{ color: "#613D2B" }}>Phone</p>
                <p style={{ marginTop: "-12px" }}>083896833122</p>
              </div>
            </div>
            <div style={{ width: "45%" }}>
              <h3 className="fw-bold mb-4">History Transaction</h3>
              <div
                style={{ backgroundColor: "white" }}
                className="p-3 d-flex justify-content-between"
              >
                <div>
                  <p className="fw-bold">Geprek Bensu</p>
                  <p style={{ marginTop: "-12px", fontSize: "13px" }}>
                    <strong>Saturday</strong>, 12 March 2021
                  </p>
                  <p
                    style={{ fontSize: "13px", marginBottom: "0px" }}
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

export default Profile;
