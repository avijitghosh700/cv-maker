import React from "react";

import "./CVMaker.scss";
import Experience from "./Experience/Experience";
import Personal from "./Personal/Personal";

export const CVMaker = () => {
  return (
    <section className="CVMaker shadow">
      <Personal/>

      <Experience/>
    </section>
  );
};
