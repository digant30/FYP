import styles from "../home.module.css";

function App() {
  return (
    <div className={styles.topnav}>
      <div>
        <h1> FAKE PRODUCT IDENTIFICATION </h1>
      </div>
      <a href="/">Home</a>
      <a href="login">Manufacturer</a>
      <a href="sellerlogin">Seller</a>
      <a href="consumerlogin">Consumer</a>
    </div>
  );
}

export default App;
