import Container from "react-bootstrap/Container";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import toRupiah from "@develoka/angka-rupiah-js";

function Transaction() {
  useEffect(() => {
    document.title = "Income Transaction";
  }, []);

  const [state] = useContext(UserContext);

  let { data: transactions } = useQuery("mytransactions12Cache", async () => {
    const response = await API.get("/my-transactions");
    const response2 = response.data.data.filter(
      (p) => p.admin_id == state.user.id
    );
    return response2;
  });

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
                    <th
                      style={{
                        wordBreak: "break-all",
                        width: "5%",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      No
                    </th>
                    <th
                      style={{
                        wordBreak: "break-all",
                        width: "15%",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        wordBreak: "break-all",
                        width: "35%",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Products Order
                    </th>
                    <th
                      style={{
                        wordBreak: "break-all",
                        width: "13%",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Value
                    </th>
                    <th
                      style={{
                        wordBreak: "break-all",
                        width: "5%",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>
                  {transactions?.map((p, index) => (
                    <tr>
                      <td
                        style={{
                          wordBreak: "break-all",
                          width: "5%",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        key={p.id}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          width: "15%",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {p.date}
                      </td>
                      <td style={{ wordBreak: "break-all", width: "35%" }}>
                        {p.product}
                      </td>
                      <td
                        style={{
                          wordBreak: "break-all",
                          width: "13%",
                          verticalAlign: "middle",
                        }}
                      >
                        {toRupiah(p.value, { dot: ",", floatingPoint: 0 })}
                      </td>

                      {p.status == "Pending" ? (
                        <td
                          style={{
                            wordBreak: "break-all",
                            width: "10%",
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          <span className="text-warning">{p.status}</span>
                        </td>
                      ) : (
                        <td
                          style={{
                            wordBreak: "break-all",
                            width: "10%",
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          <span style={{ color: "green" }}>{p.status}</span>
                        </td>
                      )}
                    </tr>
                  ))}
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
