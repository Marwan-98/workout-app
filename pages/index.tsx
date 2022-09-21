import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import SignIn from "./signIn";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <SignIn />
    </div>
  );
};

export default Home;
