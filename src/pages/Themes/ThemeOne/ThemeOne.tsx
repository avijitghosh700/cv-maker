import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Divider, Typography } from "antd";

import { VscMention } from "react-icons/vsc";
import { PhoneOutlined } from "@ant-design/icons";

import { RootState } from "../../../store/store";

import "./ThemeOne.scss";

const { Title } = Typography;

const ThemeOne = () => {
  const navigate = useNavigate();

  const getPersonal = useSelector((store: RootState) => store.personal.data);
  const getExperience = useSelector((store: RootState) => store.experience.data);
  const getProjects = useSelector((store: RootState) => store.projects.data);
  const getSkills = useSelector((store: RootState) => store.skills.data);
  const getEducation = useSelector((store: RootState) => store.education.data);
  const getCertifications = useSelector((store: RootState) => store.certifications.data);
  const getLanguages = useSelector((store: RootState) => store.languages.data);
  const getHobbies = useSelector((store: RootState) => store.hobbies.data);

  const goBack = () => navigate("/themes");

  const print = () => window.print();

  return (
    <section className="ThemeOne">
      <div className="ThemeOne__cv p-4">
        <div className="ThemeOne__personal">
          <div className="ThemeOne__head">
            <Title level={2}>{`${getPersonal?.fname} ${getPersonal?.lname}`}</Title>
          </div>

          <div className="ThemeOne__personal-body">
            {getPersonal?.email && (
              <div className="ThemeOne__personal-sub color__gray">
                <VscMention size={25} />
                <span className="color__gray">{getPersonal?.email}</span>
              </div>
            )}

            {getPersonal?.phone && (
              <div className="ThemeOne__personal-sub color__gray">
                <PhoneOutlined />
                <span className="color__gray">{getPersonal?.phone}</span>
              </div>
            )}
          </div>
        </div>

        <Divider />

        <div className="ThemeOne__experience"></div>

        <Divider />

        <div className="ThemeOne__projects"></div>

        <Divider />

        <div className="ThemeOne__personal"></div>
      </div>

      <div className="ThemeOne__btnGrp noprint">
        <button className="btn btn__primary" onClick={goBack}>
          back
        </button>
        <button className="btn btn__primary" onClick={print}>
          Print
        </button>
      </div>
    </section>
  );
};

export default ThemeOne;
