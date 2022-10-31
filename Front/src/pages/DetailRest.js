import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import toRupiah from "@develoka/angka-rupiah-js";
import Dropdown from "react-bootstrap/Dropdown";

function Detail({ addItem }) {
  const [state] = useContext(UserContext);

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

  const [category, setCategory] = useState(1);

  const handleCat1 = () => setCategory(1);
  const handleCat2 = () => setCategory(2);

  useEffect(() => {
    document.title = "Restaurant Menu";
  }, []);

  let { id } = useParams();
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    const response2 = response.data.data.filter((p) => p.admin_id == id);
    return response2;
  });

  return (
    <div>
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
          <div className="d-flex justify-content-between">
            <h2 className="fw-bold mb-4">Menu</h2>
            <Dropdown>
              <Dropdown.Toggle
                style={{ backgroundColor: "#433434", marginRight: "80px" }}
                id="dropdown-basic"
              >
                Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleCat1}>Foods</Dropdown.Item>
                <Dropdown.Item onClick={handleCat2}>Beverages</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="d-flex flex-wrap">
            {products?.map((p) =>
              p.category.id == category ? (
                <Card
                  style={{ width: "14rem" }}
                  className="p-2 mb-3 me-4"
                  key={p.id}
                >
                  <Card.Img
                    variant="top"
                    src={p.image}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "120px",
                    }}
                  />
                  <Card.Body className="py-3 px-1">
                    <Card.Title className="fs-6">{p.title}</Card.Title>
                    <Card.Text className="text-danger">
                      {toRupiah(p.price, { dot: ",", floatingPoint: 0 })}
                    </Card.Text>

                    {state.user.role == "user" ? (
                      <Button
                        style={{
                          marginBottom: "-10px",
                          width: "100%",
                          backgroundColor: "#FFC700",
                          border: "none",
                        }}
                        className="py-1 text-dark"
                        onClick={() => {
                          showToastMessage();
                          addItem(p);
                        }}
                      >
                        Order
                      </Button>
                    ) : (
                      <Button
                        style={{
                          marginBottom: "-10px",
                          width: "100%",
                          backgroundColor: "#FFC700",
                          border: "none",
                        }}
                        className="py-1 text-dark"
                      >
                        Order
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              ) : (
                <div></div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
