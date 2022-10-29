import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';

function Detail({ addItem }) {
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

  let { id } = useParams();
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    const response2 = response.data.data.filter((p) => p.admin_id == id);
    return response2;
  });

  console.log(products);

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
          <h2 className="fw-bold mb-4">Menu</h2>
            <div className="d-flex justify-content-evenly flex-wrap">
              {products?.map((p) => (
                <Card
                  style={{ width: "14rem" }}
                  className="p-2 mb-3"
                  key={p.id}
                >
                  <Card.Img variant="top" src={p.image} />
                  <Card.Body className="py-3 px-1">
                    <Card.Title className="fs-6">{p.title}</Card.Title>
                    <Card.Text className="text-danger">{p.price}</Card.Text>
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
                  </Card.Body>
                </Card>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
