import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../home.module.css";

function App() {
  const history = useHistory();

  const [transactionId, settransactionId] = useState("");

  async function QueryTransaction(event) {
    event.preventDefault();

    fetch(
      "http://localhost:4000/channels/mychannel/transactions/" + transactionId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert("Transaction retreival successful");
        console.log(data);

        let container = document.getElementById("container");

        let table = document.createElement("table");

        data.forEach((item) => {
          let tr = document.createElement("tr");

          let vals = Object.values(item);

          vals.forEach((elem) => {
            let td = document.createElement("td");
            td.innerText = elem;
            tr.appendChild(td);
          });
          table.appendChild(tr);
        });
        container.appendChild(table);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div class={styles.topnav}>
        <a href="/">Home</a>
        <a href="register">Register</a>
        <a href="login">Login</a>
        <a href="addproduct">Add Product</a>
        <a href="addseller">Add Seller</a>
        <a href="changeowner">Change Owner</a>
        <a href="authenticate">Authenticate</a>
        <a href="queryall">Query All Products</a>
        <a href="queryprod">Query Product</a>
        <a href="addconsumer">Add Consumer</a>
        <a href="queryownerprod">Query Product Owner</a>
        <a href="queryseller">Query Seller</a>
        <a href="queryconsumer">Query Consumer</a>
        <a class={styles.active} href="querytransaction">
          Query Transaction
        </a>
        <a href="queryassethistory">Query Asset</a>
      </div>
      <h1>Query Transaction</h1>
      <form onSubmit={QueryTransaction}>
        <input
          value={transactionId}
          onChange={(e) => settransactionId(e.target.value)}
          type="text"
          placeholder="Tranasaction ID"
        />
        <br />

        <h4 id="prod"></h4>
        <input type="submit" value="Query Transaction" />
        <thead>
          <th>Product Name</th>
          <th>Color</th>
          <th>Brand</th>
          <th>Mail</th>
          <th>Consumer Name</th>
          <th>Product ID</th>
          <th>Seller ID</th>
        </thead>
        <container id="container"></container>
      </form>
    </div>
  );
}

export default App;
