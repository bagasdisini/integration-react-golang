import Map from "../assets/map.png";
import Bin from "../assets/bin.png";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import toRupiah from "@develoka/angka-rupiah-js";

function Cart({
  items,
  updateItemQuantity,
  removeItem,
  cartTotal,
  totalItems,
  emptyCart,
}) {
  const navigate = useNavigate();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  const [mapLong, setMapLong] = useState();
  const [mapLat, setMapLat] = useState();

  function showPosition(position) {
    const long = position.coords.longitude;
    const lat = position.coords.latitude;
    setMapLong(long);
    setMapLat(lat);
  }

  const mapLongLat = `${mapLong}, ${mapLat}`;

  const navigateHome = () => {
    navigate("/");
  };

  const navigateProfile = () => {
    navigate("/my-profile");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    document.title = "Cart";
  }, []);

  let titleString = "";

  for (let x = 0; x < items.length; x++) {
    if (x == 0) {
      titleString = items[x].title;
    } else {
      titleString = titleString + ", " + items[x].title;
    }
  }

  let adminID = 0;

  if (totalItems > 0) {
    adminID = items[0].admin_id;
  }

  const [form] = useState({
    value: cartTotal + 10000,
    product: titleString,
    admin_id: adminID,
    location: mapLongLat,
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/transaction", form, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      emptyCart();
    } catch (error) {
      console.log(error);
    }
  };

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

      {totalItems ? (
        <Container
          className="d-flex justify-content-center align-items-center mx-auto"
          style={{ marginTop: "10px" }}
        >
          <div className="m-5" style={{ width: "90%" }}>
            <h3 className="fw-bold mb-4">My Cart</h3>
            <div>
              <p>Delivery Location</p>
              <div className="mb-4">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Recipient's Location"
                    aria-label="Recipient's location"
                    aria-describedby="basic-addon2"
                    className="py-2"
                    type="text"
                    value={mapLongLat}
                  />
                  <Button
                    style={{
                      width: "25%",
                      backgroundColor: "#433434",
                      border: "none",
                    }}
                    onClick={() => {
                      handleShow();
                      getLocation();
                    }}
                  >
                    Select on map <img src={Map} alt="map"></img>
                  </Button>
                </InputGroup>
              </div>
              <p>Review Your Order</p>
              <div className="d-flex">
                <div
                  style={{ width: "60%", overflowY: "scroll", height: "250px" }}
                >
                  <hr style={{ opacity: "100%" }}></hr>
                  {items.map((item) => (
                    <div key={item.id}>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <img
                            src={item.image}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                            alt="geprek"
                          ></img>
                          <div className="align-self-center">
                            <p className="ms-3">{item.title}</p>
                            <Button
                              style={{
                                backgroundColor: "#433434",
                                border: "none",
                                marginLeft: "5px",
                              }}
                              className="px-2 py-0 mx-3"
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <span
                              style={{ display: "inline-block", width: "15px" }}
                            >
                              {item.quantity}
                            </span>
                            <Button
                              style={{
                                backgroundColor: "#433434",
                                border: "none",
                                marginLeft: "5px",
                              }}
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-0 ms-3"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                          <div>
                            <p className="text-danger">
                              {toRupiah(item.quantity * item.price, {
                                dot: ",",
                                floatingPoint: 0,
                              })}
                            </p>
                            <img
                              src={Bin}
                              alt="sampah"
                              className="ms-5"
                              onClick={() => {
                                removeItem(item.id);
                              }}
                              style={{ float: "right" }}
                            ></img>
                          </div>
                        </div>
                      </div>
                      <hr style={{ opacity: "100%" }}></hr>
                    </div>
                  ))}
                  <div>
                    <Button
                      style={{
                        backgroundColor: "#433434",
                        border: "none",
                      }}
                      onClick={navigateHome}
                    >
                      Add more foods!
                    </Button>
                  </div>
                </div>
                <div style={{ width: "40%" }} className="ms-5 ">
                  <hr style={{ opacity: "100%" }}></hr>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p>Subtotal</p>
                      <p>Qty</p>
                      <p>Ongkir</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className="text-danger">
                        {toRupiah(cartTotal, { dot: ",", floatingPoint: 0 })}
                      </p>
                      <p>{totalItems}</p>
                      <p className="text-danger">Rp10.000</p>
                    </div>
                  </div>
                  <hr style={{ marginTop: "-3px", opacity: "100%" }}></hr>
                  <div className="d-flex justify-content-between">
                    <p className="text-danger">Total</p>
                    <p className="text-danger">
                      {toRupiah(cartTotal + 10000, {
                        dot: ",",
                        floatingPoint: 0,
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                style={{
                  float: "right",
                  backgroundColor: "#433434",
                  border: "none",
                }}
                className="px-5"
                onClick={(e) => {
                  handleSubmit(e);
                  navigateProfile();
                }}
              >
                Order!
              </Button>
            </div>
          </div>
        </Container>
      ) : (
        <Container>
          <div>
            <div className="mt-5 pt-5">
              <div className="text-center">
                <h1 className="display-1 fw-bold mb-5">404 &nbsp; :(</h1>
                <p className="fs-3">
                  {" "}
                  <span>Oops!</span> Food not found.
                </p>
                <p className="lead mb-4">
                  The food you’re looking for doesn’t exist in your cart.
                </p>
                <Button
                  style={{
                    backgroundColor: "#433434",
                    border: "none",
                  }}
                  onClick={navigateHome}
                >
                  Go Shopping!
                </Button>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default Cart;
