import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Icon from "../assets/Icon.png";
import Cart from "../assets/cart.png";
import Dropdown from "react-bootstrap/Dropdown";
import Logout from "../assets/export.png";
import PP from "../assets/fotoprofile.png";
import Profile from "../assets/profile.png";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Product from "../assets/product.png";
import { Link, useNavigate } from "react-router-dom";

function Navigation({ state, setState, totalItems }) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    if (email === state.user.email) {
      setState({
        isLogin: true,
        isLoginUser: true,
      });
    } else if (email === state.admin.email) {
      setState({
        isLogin: true,
        isLoginAdmin: true,
      });
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    setState({
      isLogin: false,
      isLoginAdmin: false,
    });
  };

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const navigateProfile = () => {
    navigate("/my-profile");
  };

  const navigateCart = () => {
    navigate("/cart");
  };

  const navigatePartner = () => {
    navigate("/profile-partner");
  };

  const navigateAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <Navbar style={{ backgroundColor: "#FFC700" }} className="sticky-top">
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form className="p-3">
            <h3 className="mb-4 fw-bold" style={{ color: "#FFC700" }}>
              Register
            </h3>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                type="text"
                placeholder="Full Name"
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="gender"
              style={{ backgroundColor: "#F4F4F4" }}
            >
              <Form.Select style={{ backgroundColor: "#F4F4F4" }}>
                <option hidden>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                type="number"
                placeholder="Phone"
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="type">
              <Form.Select style={{ backgroundColor: "#F4F4F4" }}>
                <option>As User</option>
                <option>As Partner</option>
              </Form.Select>
            </Form.Group>
            <Button
              type="submit"
              style={{ width: "100%", background: "#433434", border: "none" }}
            >
              Register
            </Button>
          </Form>
          <div className="d-flex justify-content-center mx-auto">
            <p>
              Already have an account ? Click{" "}
              <button
                onClick={() => {
                  handleShow1();
                  handleClose();
                }}
                style={{ border: "none", backgroundColor: "white" }}
                className="p-0"
              >
                here
              </button>
            </p>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Body>
          <Form className="p-3" onSubmit={handleOnSubmit}>
            <h3 className="mb-4 fw-bold" style={{ color: "#FFC700" }}>
              Login
            </h3>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                id="email"
                type="email"
                placeholder="Email"
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </Form.Group>
            <Button
              type="submit"
              style={{ width: "100%", background: "#433434", border: "none" }}
              onClick={() => {
                handleClose1();
              }}
            >
              Login
            </Button>
          </Form>
          <div className="d-flex justify-content-center mx-auto">
            <p>
              Don't have an account ? Click{" "}
              <button
                onClick={() => {
                  handleShow();
                  handleClose1();
                }}
                style={{ border: "none", backgroundColor: "white" }}
                className="p-0"
              >
                here
              </button>
            </p>
          </div>
        </Modal.Body>
      </Modal>

      <Container>
        <img
          src={Icon}
          width="125"
          alt="logo"
          onClick={navigateHome}
          style={{ cursor: "pointer" }}
        />
        {state.isLoginUser ? (
          <div
            style={{ float: "right", marginRight: "70px" }}
            className="d-flex align-items-center"
          >
            <img
              src={Cart}
              alt="logo"
              width="25px"
              height="25px"
              className="me-2"
              onClick={navigateCart}
            />
            {totalItems > 0 ? (
              <div
                className="position-relative"
                style={{ right: "13px", top: "-3px" }}
                onClick={navigateCart}
              >
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                  <span className="visually-hidden"></span>
                </span>
              </div>
            ) : (
              <div></div>
            )}
            <Dropdown style={{ width: "10px" }}>
              <Dropdown.Toggle
                style={{
                  width: "10px",
                  backgroundColor: "#FFC700",
                  border: "none",
                }}
              >
                <img src={PP} alt="logo" width="40px" height="40px" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={navigateProfile}>
                  <img
                    src={Profile}
                    alt="PP"
                    width="15px"
                    height="15px"
                    className="me-1"
                  />{" "}
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  <Link to="/">
                    <img
                      src={Logout}
                      alt="PP"
                      width="15px"
                      height="15px"
                      className="me-1"
                    />{" "}
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : state.isLoginAdmin ? (
          <div
            style={{ float: "right", marginRight: "70px" }}
            className="d-flex align-items-center"
          >
            <Dropdown style={{ width: "10px" }}>
              <Dropdown.Toggle
                style={{
                  width: "10px",
                  backgroundColor: "#FFC700",
                  border: "none",
                }}
              >
                <img src={PP} alt="logo" width="40px" height="40px" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={navigatePartner}>
                  <img
                    src={Profile}
                    alt="PP"
                    width="15px"
                    height="15px"
                    className="me-1"
                  />{" "}
                  Profile Partner
                </Dropdown.Item>
                <Dropdown.Item onClick={navigateAddProduct}>
                  <img
                    src={Product}
                    alt="PP"
                    width="15px"
                    height="15px"
                    className="me-1"
                  />{" "}
                  Add Product
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  <Link to="/">
                    <img
                      src={Logout}
                      alt="PP"
                      width="15px"
                      height="15px"
                      className="me-1"
                    />{" "}
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div style={{ float: "right" }}>
            <Button
              style={{
                backgroundColor: "#433434",
                fontSize: "12px",
                width: "100px",
                border: "none",
              }}
              onClick={handleShow}
              className="me-3 px-4 py-1"
            >
              Register
            </Button>
            <Button
              style={{
                backgroundColor: "#433434",
                fontSize: "12px",
                width: "100px",
                border: "none",
              }}
              className="px-4 py-1"
              onClick={handleShow1}
            >
              Login
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
