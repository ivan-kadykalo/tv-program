import styles from "../page.module.scss";
import React from "react";
import {Navigation} from "@/components/Navigation/Navigation";

export default function Test() {
  return (
    <div className={styles.page}>
      <header>
        <Navigation />
      </header>

      <main>
        <h1> This is a test page </h1>
      </main>
    </div>
  );
}
