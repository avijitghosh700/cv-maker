import React from "react";

import Education from "./Education/Education";
import Experience from "./Experience/Experience";
import Personal from "./Personal/Personal";
import Projects from "./Projects/Projects";

import "./CVMaker.scss";
import Skills from "./Skills/Skills";

export const CVMaker = () => {
  return (
    <section className="CVMaker shadow">
      <Personal/>

      <Experience/>

      <Projects/>

      <Skills/>

      <Education/>
    </section>
  );
};
