import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button } from "antd";
import { LayoutOutlined } from "@ant-design/icons";

import { RootState } from "../../store/store";

import Education from "./Education/Education";
import Experience from "./Experience/Experience";
import Personal from "./Personal/Personal";
import Projects from "./Projects/Projects";
import Skills from "./Skills/Skills";
import Certifications from "./Certifications/Certifications";
import Languages from "./Languages/Languages";
import Hobbies from "./Hobbies/Hobbies";

import "./CVMaker.scss";

const CVMaker = () => {
  const navigate = useNavigate();

  const isPersonalSubmitted = useSelector((store: RootState) => store.personal.isSubmitted);
  const isExperienceSubmitted = useSelector((store: RootState) => store.experience.isSubmitted);
  const isProjectsSubmitted = useSelector((store: RootState) => store.projects.isSubmitted);
  const isSkillsSubmitted = useSelector((store: RootState) => store.skills.isSubmitted);
  const isEducationSubmitted = useSelector((store: RootState) => store.education.isSubmitted);
  const isCertificationsSubmitted = useSelector(
    (store: RootState) => store.certifications.isSubmitted
  );
  const isLanguagesSubmitted = useSelector((store: RootState) => store.languages.isSubmitted);
  const isHobbiesSubmitted = useSelector((store: RootState) => store.hobbies.isSubmitted);

  const isReady: boolean = (isPersonalSubmitted &&
    isExperienceSubmitted &&
    isProjectsSubmitted &&
    isSkillsSubmitted &&
    isEducationSubmitted &&
    isCertificationsSubmitted &&
    isLanguagesSubmitted &&
    isHobbiesSubmitted) as boolean;

  return (
    <section className="CVMaker shadow">
      <div className="CVMaker__wrapper">
        <Personal />

        <Experience />

        <Projects />

        <Skills />

        <Education />

        <Certifications />

        <Languages />

        <Hobbies />
      </div>

      <div className="CVMaker__btnGrp">
        <Button
          htmlType="button"
          className="btn btn__primary mx-auto"
          disabled={!isReady}
          onClick={() => navigate("../themes")}
        >
          <LayoutOutlined size={25} />
          Select Theme
        </Button>
      </div>
    </section>
  );
};

export default CVMaker;
