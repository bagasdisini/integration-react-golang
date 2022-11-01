import Container from "react-bootstrap/Container";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Map from "../assets/map.png";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

function EditProfilePartner() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const style = {
    height: "500px",
    width: "100%",
  };

  const [draggable] = useState(true);
  const [position, setPosition] = useState([-6.3818149, 106.7495821]);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  var positionStr = `${position.lat}, ${position.lng}`

  useEffect(() => {
    document.title = "Edit Profile Partner";
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    image: "",
    email: "",
    phone: "",
    location: positionStr,
  });

  const idid = state?.user.id;

  let { data: user } = useQuery("admin1Cache", async () => {
    const response = await API.get("/admin/" + idid);
    return response.data.data;
  });

  useEffect(() => {
    if (user) {
      setForm({
        ...form,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        phone: user.phone,
        location: positionStr,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type == "file") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (preview) {
        formData.set("image", form?.image, form?.image.name);
      }
      formData.set("fullName", form.fullName);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("location", positionStr);

      const response = await API.patch(`/admin/${idid}`, formData);

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      navigate("/profile-partner");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
       <Modal show={show} onHide={handleClose} size="lg" id="map">
        <Modal.Body>
          <MapContainer center={position} zoom={50} style={style}>
            <TileLayer
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              draggable={draggable}
              eventHandlers={eventHandlers}
              position={position}
              ref={markerRef}
            >
              <Tooltip permanent>{positionStr}</Tooltip>
            </Marker>
          </MapContainer>
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
          <Form>
            <h3 className="fw-bold mb-4">Edit Profile Partner</h3>
            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
            <div>
              <div className="d-flex justify-content-between">
                <InputGroup className="mb-3" style={{ width: "69%" }}>
                  <Form.Control
                    placeholder="Name Partner"
                    aria-label="Partner"
                    aria-describedby="basic-addon1"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3" style={{ width: "30%" }}>
                  <Form.Control
                    placeholder="Attach Image"
                    aria-label="Image"
                    aria-describedby="basic-addon1"
                    type="file"
                    name="image"
                    onChange={handleChange}
                  />
                </InputGroup>
              </div>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Email"
                  aria-label="Email"
                  value={form.email}
                  aria-describedby="basic-addon1"
                  name="email"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Phone"
                  aria-label="Phone"
                  value={form.phone}
                  aria-describedby="basic-addon1"
                  name="phone"
                  onChange={handleChange}
                />
              </InputGroup>
              <div className="d-flex justify-content-between">
                <InputGroup className="mb-3" style={{ width: "69%" }}>
                  <Form.Control
                    placeholder="Location"
                    aria-label="Location"
                    value={positionStr}
                    aria-describedby="basic-addon1"
                    name="location"
                    onChange={handleChange}
                  />
                </InputGroup>
                <Button
                  className="mb-3"
                  style={{ width: "30%", backgroundColor: "#433434" }}
                  onClick={() => {
                    handleShow();
                  }}
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
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default EditProfilePartner;
