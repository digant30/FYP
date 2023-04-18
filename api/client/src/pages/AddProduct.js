import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../home.module.css";

function App() {
  const history = useHistory();

  const [ProductName, setName] = useState("");
  const [ProductId, setProductId] = useState("");
  const [SellerId, setSellerId] = useState("");
  const [Brand, setBrand] = useState("");
  const [Color, setColor] = useState("");
  const [Price, setPrice] = useState("");
  const [Size, setSize] = useState("");
  const [Owner, setOwner] = useState("");
  const [Item, setItem] = useState("");

  async function AddProduct(event) {
    event.preventDefault();

    fetch("http://localhost:4000/channels/mychannel/chaincodes/smartContract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fcn: "createProduct",
        peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
        chaincodeName: "smartContract",
        channelName: "mychannel",
        args: [
          Item,
          ProductId,
          ProductName,
          Brand,
          Color,
          Price,
          Size,
          Owner,
          SellerId,
        ],
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert("Product added successfully");
        console.log(data);
        var token = document.getElementById("transactionId");
        token.innerHTML = data.result.tx_id;
        window.location.href = "http://localhost:3000/addproduct";
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div class={styles.topnav}>
        <a class={styles.active} href="addproduct">
          Add Product
        </a>
        <a href="addseller">Add Seller</a>
        <a href="changeowner">Change Product Manufacturer</a>
        <a href="queryseller">Query Seller</a>
        <a href="queryallsellers">Query All Sellers</a>
        <a href="queryconsumermanu">Query Consumer</a>
        <a href="queryallconsumersmanu">Query All Consumers</a> 
        <a href="/">Logout</a>
      </div>
      <h1>Add Product</h1>
      <form onSubmit={AddProduct}>
        <input
          value={Item}
          onChange={(e) => setItem(e.target.value)}
          type="text"
          placeholder="Item Number"
        />
        <br />
        <input
          value={ProductName}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Product Name"
        />
        <br />
        <input
          value={ProductId}
          onChange={(e) => setProductId(e.target.value)}
          type="text"
          placeholder="Product ID"
        />
        <br />
        <input
          value={SellerId}
          onChange={(e) => setSellerId(e.target.value)}
          type="text"
          placeholder="Seller ID"
        />
        <br />
        <input
          value={Brand}
          onChange={(e) => setBrand(e.target.value)}
          type="text"
          placeholder="Brand"
        />
        <br />
        <input
          value={Color}
          onChange={(e) => setColor(e.target.value)}
          type="text"
          placeholder="Color"
        />
        <br />
        <input
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          placeholder="Price"
        />
        <br />
        <input
          value={Size}
          onChange={(e) => setSize(e.target.value)}
          type="text"
          placeholder="Size"
        />
        <br />
        <input
          value={Owner}
          onChange={(e) => setOwner(e.target.value)}
          type="text"
          placeholder="Manufacturer"
        />
        <br />

        <input type="submit" value="Add Product" />
      </form>
    </div>
  );
}

export default App;
