import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  
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
        console.log(localStorage.getItem("token"));
        window.location.href = "http://localhost:3000/addproduct";
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <html>
      <body>
        <div>
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
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              type="text"
              placeholder="Organization Name"
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
