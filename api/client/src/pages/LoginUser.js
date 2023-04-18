import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../home.module.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [responseData, setResponseData] = useState("");

  async function LoginUser(event) {
    event.preventDefault();

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username,
        password,
        orgName,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var token = document.getElementById("token");
        //var body = document.getElementById("bd");
        token.innerHTML = localStorage.getItem("token");
        console.log(localStorage.getItem("token"));
        //body.innerHTML = data.body;
        // window.$token = data.token;
        // var variable = window.$token;
        // console.log(window.$token);
        window.location.href = "http://localhost:3000/addproduct";
      })
      .catch((error) => console.error("Error:", error));

    // const response = await fetch("http://localhost:1337/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username,
    //     orgName,
    //   }),
    // });
    // const data = await response.json();
    // console.log(data);
    // if (data.status === "ok") {
    //   console.log(data.token);
    //   buildResponseData(data);
    //   setResponseData(data);
    // }
  }

  function buildResponseData(data) {
    var token = document.getElementById("token");
    window.$token = data.token;
    //var body = document.getElementById("bd");
    token.innerHTML = sessionStorage.getItem("token");
    //body.innerHTML = data.body;
  }

  return (
    <html>
      <body>
        <div>
          <h1>Login</h1>
          <form onSubmit={LoginUser}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <br />
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              type="text"
              placeholder="Organization Name"
            />
            <br />
            <input type="submit" value="Login" />
          </form>

          <h4 id="token"></h4>
        </div>
        <script></script>
      </body>
    </html>
  );
}

export default App;
