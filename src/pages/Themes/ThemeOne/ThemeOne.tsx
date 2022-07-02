import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Divider, Typography } from "antd";

import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  PrinterOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

import { RootState } from "../../../store/store";

import "./ThemeOne.scss";
import { formatDate } from "../../../shared/functions/utils";

const { Text, Title, Paragraph } = Typography;

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
                <MailOutlined className="icon me-1" />
                <span className="color__gray">{getPersonal?.email}</span>
              </div>
            )}

            {getPersonal?.phone && (
              <div className="ThemeOne__personal-sub color__gray">
                <PhoneOutlined className="icon me-1" />
                <span className="color__gray">{getPersonal?.phone}</span>
              </div>
            )}

            {getPersonal?.github && (
              <div className="ThemeOne__personal-sub color__gray">
                <GithubOutlined className="icon me-1" />
                <span className="color__gray">{getPersonal?.github}</span>
              </div>
            )}

            {getPersonal?.linkedin && (
              <div className="ThemeOne__personal-sub color__gray">
                <LinkedinOutlined className="me-1" size={25} />
                <span className="color__gray">{getPersonal?.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        <Divider>Summary</Divider>

        <div className="ThemeOne__summary">
          {getPersonal?.summary && (
            <Paragraph className="fw-light">{getPersonal?.summary}</Paragraph>
          )}
        </div>

        <Divider>Experience</Divider>

        <div className="ThemeOne__experiences">
          {getExperience?.length &&
            getExperience.map((exp, index) => {
              return (
                <div className="ThemeOne__experience" key={`${exp.companyName}-${index}`}>
                  <div className="ThemeOne__experienceHead mb-2">
                    <Title level={4} className="m-0">
                      {exp.companyName}
                    </Title>
                    {exp.startDate && (
                      <Text className="ThemeOne__experienceDate">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </Text>
                    )}
                  </div>

                  <div className="ThemeOne__experienceBody">
                    <Title level={5} className="color__gray fw-normal">
                      {exp.position}
                    </Title>
                    {exp.responsibilities && (
                      <Paragraph className="fw-light">{exp.responsibilities}</Paragraph>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        <Divider>Projects</Divider>

        <div className="ThemeOne__projects"></div>

        <Divider>Skills</Divider>

        <div className="ThemeOne__skills"></div>
      </div>

      <div className="ThemeOne__btnGrp noprint">
        <button className="btn btn__secondary" onClick={goBack}>
          <RollbackOutlined className="me-1" />
          Back
        </button>
        <button className="btn btn__primary" onClick={print}>
          <PrinterOutlined className="me-1" />
          Print
        </button>
      </div>
    </section>
  );
};

export default ThemeOne;
