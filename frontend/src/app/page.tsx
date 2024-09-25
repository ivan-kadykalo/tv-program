import styles from "./page.module.scss";
import React  from "react";
import {Navigation} from "@/components/Navigation/Navigation";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <Navigation />
      </header>

      <main>
        <h1 className={styles.title}>
          Що дивимось сьогодні?
        </h1>
      </main>
    </div>
  );
}
