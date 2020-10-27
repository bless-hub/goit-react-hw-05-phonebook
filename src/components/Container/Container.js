import React from "react";
import style from "./container.module.css";

export default function Container({ children }) {
  return <section className={style.section}>{children}</section>;
}
