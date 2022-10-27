import Checked from "../assets/checked.png";
import Cancel from "../assets/cancel.png";
import Container from "react-bootstrap/Container";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Transaction() {

  useEffect(() => {
    document.title = "Income Transaction";
  }, []);

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center mx-auto"
        style={{ marginTop: "10px" }}
      >
        <div className="m-5" style={{ width: "90%" }}>
          <div>
            <h3 className="fw-bold mb-4">Income Transaction</h3>
            <div>
              <Table bordered hover style={{ border: "1px" }}>
                <thead style={{ backgroundColor: "#E5E5E5" }}>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Products Order</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>
                  <tr>
                    <td>1</td>
                    <td>Sugeng No Pants</td>
                    <td>Cileungsi</td>
                    <td>Pkaket Geprek, Paket ke..</td>
                    <td className="text-warning">Waiting Approve</td>
                    <td className="d-flex justify-content-evenly p-1">
                      <Button className="py-1 px-3 bg-danger border-0">
                        Cancel
                      </Button>
                      <Button className="py-1 px-3 bg-success border-0">
                        Approve
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Haris Gams</td>
                    <td>Serang</td>
                    <td>Pkaket Geprek, Paket ke..</td>
                    <td className="text-success">Success</td>
                    <td className="d-flex justify-content-center">
                      <img src={Checked} alt="centang"></img>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Aziz Union</td>
                    <td>Bekasi</td>
                    <td>Pkaket Geprek, Paket ke..</td>
                    <td className="text-danger">Cancel</td>
                    <td className="d-flex justify-content-center">
                      <img src={Cancel} alt="cancel"></img>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Lae Tanjung Balai</td>
                    <td>Tanjung Balai</td>
                    <td>Pkaket Geprek, Paket ke..</td>
                    <td className="text-primary">On The Way</td>
                    <td className="d-flex justify-content-center">
                      <img src={Checked} alt="centang"></img>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Transaction;
