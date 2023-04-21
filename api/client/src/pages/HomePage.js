import styles from "../home.module.css";

function App() {
  return (
    <div className={styles.topnav}>
      <div>
        <h1> FAKE PRODUCT IDENTIFICATION </h1>
      </div>
      <a href="/">Home</a>
      <a href="consumerregister">Register</a>
      <a href="consumerlogin">Login</a>
    </div>
  );
}

export default App;
