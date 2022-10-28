import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Foods } from "../data/Foods";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

function Detail({ addItem }) {

  const navigate = useNavigate();

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
      console.log(e);
      const alert = <Alert variant="danger">Register gagal!</Alert>;

      setMessage(alert);
    }
  });

  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", form);

      const alert = <Alert variant="success">Login berhasil!</Alert>;

      setMessage(alert);

      let payload = data.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });

      navigate("/");

      console.log("isi payload", payload);
      console.log("ini data login", data);
    } catch (error) {
      console.log(error);
      const alert = <Alert variant="danger">Email / password salah!</Alert>;

      setMessage(alert);
    }
  });

  const showToastMessage = () => {
    toast.success("Sukses menambahkan ke keranjang!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  useEffect(() => {
    document.title = "Geprek Bensu's Menu";
  }, []);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <div>
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
                placeholder="Email"
                style={{ backgroundColor: "#F4F4F4" }}
                onChange={handleChange}
                name="email"
                value={email}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                style={{ backgroundColor: "#F4F4F4" }}
                onChange={handleChange}
                name="password"
                value={password}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full Name"
                style={{ backgroundColor: "#F4F4F4" }}
                value={fullName}
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
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Phone"
                style={{ backgroundColor: "#F4F4F4" }}
                onChange={handleChange}
                name="phone"
                value={phone}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                style={{ backgroundColor: "#F4F4F4" }}
                value={role}
                onChange={handleChange}
                name="role"
              >
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

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ marginTop: "10px" }}
      >
        <div className="m-5" style={{ width: "70%" }}>
          <h2 className="fw-bold mb-4">Geprek Bensu, Menus</h2>

          {state.isLogin ?(
          <div className="d-flex justify-content-evenly flex-wrap">
            {Foods.map((p) => (
              <Card style={{ width: "14rem" }} className="p-2 mb-3" key={p.id}>
                <Card.Img variant="top" src={p.image} />
                <Card.Body className="py-3 px-1">
                  <Card.Title className="fs-6">{p.name}</Card.Title>
                  <Card.Text className="text-danger">{p.price1}</Card.Text>
                  <Button
                    style={{
                      marginBottom: "-10px",
                      width: "100%",
                      backgroundColor: "#FFC700",
                      border: "none",
                    }}
                    className="py-1 text-dark"
                    onClick={() => {
                      addItem(p);
                      showToastMessage();
                    }}
                  >
                    Order
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          ) : (
            <div className="d-flex justify-content-evenly flex-wrap">
            {Foods.map((p) => (
              <Card style={{ width: "14rem" }} className="p-2 mb-3" key={p.id}>
                <Card.Img variant="top" src={p.image} />
                <Card.Body className="py-3 px-1">
                  <Card.Title className="fs-6">{p.name}</Card.Title>
                  <Card.Text className="text-danger">{p.price1}</Card.Text>
                  <Button
                    style={{
                      marginBottom: "-10px",
                      width: "100%",
                      backgroundColor: "#FFC700",
                      border: "none",
                    }}
                    className="py-1 text-dark"
                    onClick={() => {
                      handleShow();
                    }}
                  >
                    Order
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
