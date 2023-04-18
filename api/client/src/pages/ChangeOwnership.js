import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../home.module.css";

function App() {
  const history = useHistory();

  const [ProductId, setProductId] = useState("");
  const [Owner, setOwner] = useState("");

  async function ChangeOwnership(event) {
    event.preventDefault();

    fetch("http://localhost:4000/channels/mychannel/chaincodes/smartContract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fcn: "changeProductOwner",
        peers: ["peer0.org1.example.com", "peer0.org2.example.com"],
        chaincodeName: "smartContract",
        channelName: "mychannel",
        args: [ProductId, Owner],
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert("Product ownership changed successfully");
        console.log(data);
        window.location.href = "http://localhost:3000/authenticate";
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div class={styles.topnav}>
        <a href="addproduct">Add Product</a>
        <a href="addseller">Add Seller</a>
        <a class={styles.active} href="changeowner">Change Product Manufacturer</a>
        <a href="queryseller">Query Seller</a>
        <a href="queryallsellers">Query All Sellers</a>
        <a href="queryconsumermanu">Query Consumer</a>
        <a href="queryallconsumersmanu">Query All Consumers</a> 
        <a href="/">Logout</a>
      </div>
      <h1>Change Ownership</h1>
      <form onSubmit={ChangeOwnership}>
        <input
          value={ProductId}
          onChange={(e) => setProductId(e.target.value)}
          type="text"
          placeholder="Item Number"
        />
        <br />
        <input
          value={Owner}
          onChange={(e) => setOwner(e.target.value)}
          type="text"
          placeholder="Manufacturer"
        />
        <br />

        <h4 id="sample"></h4>
        <input type="submit" value="Change Manufacturer" />
      </form>
    </div>
  );
}

export default App;
