import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../home.module.css";

function App() {
  const history = useHistory();

  const [Item, setItem] = useState("");

  async function QueryProduct(event) {
    event.preventDefault();

    fetch(
      'http://localhost:4000/channels/mychannel/chaincodes/smartContract?args=["' +
        Item +
        '"]&peer=peer0.org1.example.com&fcn=queryProduct',
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
        alert("Product query successful");
        console.log(data);

        let container = document.getElementById("container");

        let table = document.createElement("table");
        table.setAttribute("class", styles.styledtable);

        const titleAttributes = [
          "Brand",
          "Colour",
          "Product Id",
          "Product Name",
          "Manufacturer",
          "Price",
          "Seller Id",
          "Size"
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
      <div class={styles.topnav}>
        <a href="addconsumer">Add Consumer</a>
        <a class={styles.active} href="queryprod">Query Product</a>
        <a href="queryall">Query All Products</a>
        <a href="queryownerprod">Query Product Manufacturer</a>
        <a href="queryconsumer">Query Consumer</a>
        <a href="queryallconsumers">Query All Consumers</a>
        <a href="queryconsumercontact">Query Consumer By Contact</a>
        <a href="/">Logout</a>
      </div>
      <h1>Query Product</h1>
      <form onSubmit={QueryProduct}>
        <input
          value={Item}
          onChange={(e) => setItem(e.target.value)}
          type="text"
          placeholder="Item Number"
        />
        <br />
        <input type="submit" value="Query Product" />
        <container id="container"></container>
      </form>
    </div>
  );
}

export default App;
