import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Icon from "../assets/Icon.png";
import Cart from "../assets/cart.png";
import Dropdown from "react-bootstrap/Dropdown";
import Logout from "../assets/export.png";
import Profile from "../assets/profile.png";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Product from "../assets/product.png";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Navigation({ totalItems, emptyCart }) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
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
  
  const navigateProfile = () => {
    navigate(`/my-profile`);
  };

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    role: "",
  });

  const { fullName, email, password, gender, phone, role } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegist = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      const alert = <Alert variant="success">Berhasil register!</Alert>;

      setMessage(alert);
    } catch (e) {
      const alert = <Alert variant="danger">Register gagal!</Alert>;

      setMessage(alert);
    }
  });

  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", form);

      let payload = data.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });

      navigate("/");
      setShow1(false);
    } catch (e) {
      const alert = <Alert variant="danger">Email/Password Salah!</Alert>;

      setMessage(alert);
    }
  });

  const LogoutHandle = () => {
    dispatch({
      type: "LOGOUT",
    });
    emptyCart();
    navigate("/");
  };

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <Navbar style={{ backgroundColor: "#FFC700" }} className="sticky-top">
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {message && message}
          <Form className="p-3" onSubmit={(e) => handleSubmitRegist.mutate(e)}>
            <h3 className="mb-4 fw-bold" style={{ color: "#FFC700" }}>
              Register
            </h3>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                value={email}
                placeholder="Email"
                style={{ backgroundColor: "#F4F4F4" }}
                onChange={handleChange}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                style={{ backgroundColor: "#F4F4F4" }}
                onChange={handleChange}
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={fullName}
                placeholder="Full Name"
                style={{ backgroundColor: "#F4F4F4" }}
                onChange={handleChange}
                name="fullName"
              />
            </Form.Group>
            <Form.Group className="mb-3" style={{ backgroundColor: "#F4F4F4" }}>
              <Form.Select
                style={{ backgroundColor: "#F4F4F4" }}
                value={gender}
                onChange={handleChange}
                name="gender"
              >
                <option hidden>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Phone"
                value={phone}
                style={{ backgroundColor: "#F4F4F4" }}
                onChange={handleChange}
                name="phone"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                style={{ backgroundColor: "#F4F4F4" }}
                value={role}
                onChange={handleChange}
                name="role"
              >
                <option hidden>Role</option>
                <option value="user">As User</option>
                <option value="admin">As Partner</option>
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
          {message && message}
          <Form className="p-3" onSubmit={(e) => handleSubmitLogin.mutate(e)}>
            <h3 className="mb-4 fw-bold" style={{ color: "#FFC700" }}>
              Login
            </h3>
            <Form.Group className="mb-3">
              <Form.Control
                id="email"
                type="email"
                placeholder="Email"
                style={{ backgroundColor: "#F4F4F4" }}
                value={email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
                style={{ backgroundColor: "#F4F4F4" }}
                value={password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                style={{ backgroundColor: "#F4F4F4" }}
                value={role}
                name="role"
                onChange={handleChange}
              >
                <option hidden>Role</option>
                <option value="user">As User</option>
                <option value="admin">As Partner</option>
              </Form.Select>
            </Form.Group>
            <Button
              type="submit"
              style={{ width: "100%", background: "#433434", border: "none" }}
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
        {state.user.role === "user" ? (
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
                {state.user.image === "http://localhost:5000/uploads/" ? (
                  <img
                    src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                    alt="logo"
                    width="40px"
                    height="40px"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  <img
                    src={state.user.image}
                    alt="logo"
                    width="40px"
                    height="40px"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                )}
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
                <Dropdown.Item onClick={LogoutHandle}>
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
        ) : state.user.role === "admin" ? (
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
                {state.user.image === "http://localhost:5000/uploads/" ? (
                  <img
                    src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                    alt="logo"
                    width="40px"
                    height="40px"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  <img
                    src={state.user.image}
                    alt="logo"
                    width="40px"
                    height="40px"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                )}
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
                <Dropdown.Item onClick={LogoutHandle}>
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
