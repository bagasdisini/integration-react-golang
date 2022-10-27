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

function Page({ state, setState }) {
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

  const navigate = useNavigate();

  const navigateDetail = () => {
    navigate("/detail-restaurant");
  };

  useEffect(() => {
    document.title = "Ways Food";
  }, []);

  return (
    <div>
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

      <div className="my-4 mx-auto" style={{ width: "75%" }}>
        <div>
          <h3 className="fw-bold">Popular Restaurant</h3>
        </div>
        <div className="d-flex justify-content-evenly">
          {Restaurant.map((item, index) => (
            <div
              className="mb-5 mt-4 p-3 rounded"
              style={{ backgroundColor: "white", width: "23%" }}
              key={index}
            >
              <img src={item.image} alt="bk" />
              <span className="fw-bold ms-3" style={{ fontSize: "18px" }}>
                {item.name}
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
              <div className="mb-5 mt-3 p-2 rounded" key={index} style={{cursor:"pointer"}}>
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
