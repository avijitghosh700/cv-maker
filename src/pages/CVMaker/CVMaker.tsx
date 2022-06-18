import React from "react";

import Education from "./Education/Education";
import Experience from "./Experience/Experience";
import Personal from "./Personal/Personal";
import Projects from "./Projects/Projects";
import Skills from "./Skills/Skills";
import Certifications from "./Certifications/Certifications";
import Languages from "./Languages/Languages";

import "./CVMaker.scss";

export const CVMaker = () => {
  return (
    <section className="CVMaker shadow">
      <Personal/>

      <Experience/>

      <Projects/>

      <Skills/>

      <Education/>

      <Certifications/>

      <Languages/>
    </section>
  );
};
