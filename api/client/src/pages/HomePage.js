import styles from "../home.module.css";

function App() {
  return (
    <div class={styles.topnav}>
      <div>
        <h1> FAKE PRODUCT IDENTIFICATION </h1>
      </div>
      <a class={styles.active} href="/">
        Home
      </a>
      <a href="register">Register</a>
    </div>
  );
}

export default App;
