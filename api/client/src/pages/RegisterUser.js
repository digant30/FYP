import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../home.module.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [responseData, setResponseData] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        localStorage.setItem("token", data.token);
        //window.$token = data.token;
        //console.log(window.$token);
        //var body = document.getElementById("bd");
        token.innerHTML = localStorage.getItem("token");
        window.location.href = "http://localhost:3000/login";
        //body.innerHTML = data.body;
      })
      .catch((error) => console.error("Error:", error));

    // const response = await fetch("http://localhost:1337/register", {
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
    var body = document.getElementById("bd");
    token.innerHTML = data.title;
    body.innerHTML = data.body;
  }

  return (
    <div>
      <div class={styles.topnav}>
        <a href="/">Home</a>
        <a class={styles.active} href="register">
          Register
        </a>
      </div>

      <h1>Register</h1>
      <form onSubmit={registerUser}>
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default App;
