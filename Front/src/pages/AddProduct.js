import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";

function AddProduct() {
  useEffect(() => {
    document.title = "Add Product";
  }, []);

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    image: "",
    price: 0,
    category_id: 0,
  });

  console.log(form);

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

      const price = parseInt(form.price);
      const category_id = parseInt(form.category_id);

      const formData = new FormData();
      if (preview) {
        formData.set("image", form?.image, form?.image.name);
      }
      formData.set("title", form.title);
      formData.set("price", price);
      formData.set("category_id", category_id);

      const data = await API.post("/product", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      navigate("/");

      console.log("ini insert product", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ marginTop: "10px" }}
      >
        <div className="m-5" style={{ width: "90%" }}>
          <div>
            <h3 className="fw-bold mb-4">Add Product</h3>
            <Form>
              <div className="d-flex justify-content-between">
                <InputGroup className="mb-3" style={{ width: "69%" }}>
                  <Form.Control
                    placeholder="Title"
                    aria-label="Title"
                    aria-describedby="basic-addon1"
                    name="title"
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
                  placeholder="Price"
                  aria-label="Price"
                  aria-describedby="basic-addon1"
                  name="price"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Select
                  style={{ backgroundColor: "#F4F4F4" }}
                  name="category_id"
                  onChange={handleChange}
                >
                  <option hidden>Category</option>
                  <option value="1">Makanan</option>
                  <option value="2">Minuman</option>
                </Form.Select>
              </InputGroup>
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
        </div>
      </Container>
    </div>
  );
}

export default AddProduct;
