import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Map from "../assets/map.png";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function EditProfilePartner() {
  const navigate = useNavigate();

  const navigatePartner = () => {
    navigate("/profile-partner");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    document.title = "Edit Profile Partner";
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <iframe
            width="100%"
            height="400px"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=Dumbways%20&t=&z=17&ie=UTF8&iwloc=&output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            title="myFrame"
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              width: "30%",
              backgroundColor: "#433434",
              float: "right",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            style={{
              width: "30%",
              backgroundColor: "#433434",
              float: "right",
            }}
            onClick={handleClose}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Container
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ marginTop: "10px" }}
      >
        <div className="m-5" style={{ width: "90%" }}>
          <div>
            <h3 className="fw-bold mb-4">Edit Profile Partner</h3>
            <div>
              <div className="d-flex justify-content-between">
                <InputGroup className="mb-3" style={{ width: "69%" }}>
                  <Form.Control
                    placeholder="Name Partner"
                    aria-label="Partner"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3" style={{ width: "30%" }}>
                  <Form.Control
                    placeholder="Attach Image"
                    aria-label="Image"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </div>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Phone"
                  aria-label="Phone"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <div className="d-flex justify-content-between">
                <InputGroup className="mb-3" style={{ width: "69%" }}>
                  <Form.Control
                    placeholder="Location"
                    aria-label="Location"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <Button
                  className="mb-3"
                  style={{ width: "30%", backgroundColor: "#433434" }}
                  onClick={handleShow}
                >
                  Select On Map <img src={Map} alt="map"></img>
                </Button>
              </div>
            </div>
            <Button
              className="mt-5"
              style={{
                width: "30%",
                backgroundColor: "#433434",
                float: "right",
              }}
              onClick={navigatePartner}
            >
              Save
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default EditProfilePartner;
