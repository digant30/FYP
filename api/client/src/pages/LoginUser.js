import { useState } from "react";
import styles from "../home.module.css";
const BASE_URL = process.env.BASE_URL;

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success === false) {
          window.alert("Incorrect Username/Password");
          window.location.href = BASE_URL + "login";
        } else {
          console.log(data);
          console.log(localStorage.getItem("token"));
          window.location.href = BASE_URL + "addproduct";
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <html>
      <body>
        <div className={styles.form}>
          <h1>Manufacturer Login</h1>
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
            <input type="submit" value="Login" />
          </form>
        </div>
        <script></script>
      </body>
    </html>
  );
}

export default App;
