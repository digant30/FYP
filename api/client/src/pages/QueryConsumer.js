import { useState } from "react";
import styles from "../home.module.css";

function App() {

  const [consumerId, setconsumerId] = useState("");

  async function QuerySeller(event) {
    event.preventDefault();

    fetch(
      'http://localhost:4000/channels/mychannel/chaincodes/smartContract?args=["' +
        consumerId +
        '"]&peer=peer0.org1.example.com&fcn=queryConsumer',
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
        alert("Consumer query successful");
        console.log(data);

        let container = document.getElementById("container");

        let table = document.createElement("table");
        table.setAttribute("class", styles.styledtable);

        const titleAttributes = [
          "Product Name",
          "Address",
          "Contact Number",
          "Mail Id",
          "Consumer Name",
          "Product Id",
          "Seller Id",
          "Seller Name"
        ];
        let tableHead = document.createElement("thead");
        let trTitle = document.createElement("tr");

        titleAttributes.forEach((titleCard) => {
          let th = document.createElement("th");
          th.innerText = titleCard;
          trTitle.appendChild(th);
        });
        tableHead.appendChild(trTitle);
      
        let tableBody = document.createElement("tbody");

        let tr = document.createElement("tr");
        let vals = Object.values(data);
        vals.forEach((elem) => {
          let td = document.createElement("td");
          td.innerText = elem;
          tr.appendChild(td);
        });
        tableBody.appendChild(tr);
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        container.appendChild(table);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div className={styles.topnav}>
        <a href="addconsumer">Add Consumer</a>
        <a href="queryprod">Query Product</a>
        <a href="queryall">Query All Products</a>
        <a href="queryownerprod">Query Product Manufacturer</a>
        <a className={styles.active} href="queryconsumer">Query Consumer</a>
        <a href="queryallconsumers">Query All Consumers</a>
        <a href="queryconsumercontact">Query Consumer By Contact</a>
        <a href="/">Logout</a>
      </div>
      <h1>Query Consumer</h1>
      <form onSubmit={QuerySeller}>
        <input
          value={consumerId}
          onChange={(e) => setconsumerId(e.target.value)}
          type="text"
          placeholder="Consumer ID"
        />
        <br />

        <input type="submit" value="Query Consumer" />
        <container id="container"></container>
      </form>
    </div>
  );
}

export default App;
