import Pizza from "../assets/pizza.png";
import Line from "../assets/garis.png";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../data/Restaurant";
import { RestaurantNear } from "../data/RestaurantNear";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";

function Page({ setState }) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const navigate = useNavigate();

  const navigateDetail = () => {
    navigate("/detail-restaurant");
  };

  useEffect(() => {
    document.title = "Ways Food";
  }, []);

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

  console.log(form);

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

      console.log("ini response register", response);
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

  let { data: admins } = useQuery("adminCache", async () => {
    const response = await API.get("/admins");
    return response.data.data;
  });
  console.log(admins);

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

      <div className="my-4 mx-auto" style={{ width: "75%", overflow: "auto"}}>
        <div>
          <h3 className="fw-bold">Popular Restaurant</h3>
        </div>
        <div className="d-flex justify-content-evenly">
          {admins?.map((p) => (
            <div
              className="mb-5 mt-4 p-3 rounded"
              style={{ backgroundColor: "white", width: "23%" }}
              key={p.id}
            >
              {p.image == "https://localhost:5000/uploads/" ? (
                <img src={p.image} alt="" /> 
                ):(
                  <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="" width="60px" height="60px" style={{borderRadius: "50%"}}/>
              )}
              <span className="fw-bold ms-3" style={{ fontSize: "18px" }}>
                {p.fullName}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4 mx-auto" style={{ width: "75%" }}>
        <div>
          <h3 className="fw-bold">Restaurant Near You</h3>
        </div>

        {state.isLogin ? (
          <div className="d-flex justify-content-evenly">
            {RestaurantNear.map((p, index) => (
              <div
                className="mb-5 mt-3 p-2 rounded"
                key={index}
                style={{ cursor: "pointer" }}
              >
                <Card
                  style={{ width: "14rem", border: "none" }}
                  onClick={navigateDetail}
                >
                  <Card.Body>
                    <Card.Img variant="top" src={p.image} />
                    <Card.Title
                      className="my-3 fw-bold"
                      style={{ fontSize: "15px" }}
                    >
                      {p.name}
                    </Card.Title>
                    <Card.Subtitle className=" text-muted">
                      {p.distance}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex justify-content-evenly">
            {RestaurantNear.map((p, index) => (
              <div className="mb-5 mt-3 rounded" key={index}>
                <button onClick={handleShow1} style={{ border: "none" }}>
                  <Card style={{ width: "14rem", border: "none" }}>
                    <Card.Body className="text-start">
                      <Card.Img variant="top" src={p.image} />
                      <Card.Title
                        className="my-3 fw-bold"
                        style={{ fontSize: "15px" }}
                      >
                        {p.name}
                      </Card.Title>
                      <Card.Subtitle className=" text-muted">
                        {p.distance}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
