import React from "react";

import orderBy from "lodash/orderBy";
import moment from 'moment';

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Badge, Col, Divider, Progress, Row, Space, Tag, Tooltip, Typography } from "antd";

import {
  BankOutlined,
  CalendarOutlined,
  EditOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  PercentageOutlined,
  PhoneOutlined,
  PrinterOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

import { RootState } from "../../../store/store";

import { formatDate, languageStatusProvider } from "../../../shared/functions/utils";

import "./ThemeOne.scss";

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
  const getHobbies = useSelector((store: RootState) => store.hobbies.data?.hobbies);

  const hobbies: string[] = getHobbies
    ? getHobbies?.split(/[,]+/).map((hobby) => hobby.replaceAll(".", "").trim())
    : [];

  const goBack = () => navigate("/themes");

  const manageCV = () => navigate("/cv-maker");

  const print = () => window.print();

  return (
    <section className="ThemeOne pb-3">
      <div className="ThemeOne__cv p-4">
        <div className="ThemeOne__personal">
          <Space size={"middle"}>
            {getPersonal?.avatar && getPersonal?.avatar?.url && (
              <div className="ThemeOne__avatar">
                <img
                  src={getPersonal?.avatar?.url}
                  alt={`${getPersonal?.fname} ${getPersonal?.lname}`}
                />
              </div>
            )}

            <div className="ThemeOne__personalInfo">
              <div className="ThemeOne__head">
                <Title level={2} className="color__primary mb-2">
                  {`${getPersonal?.fname} ${getPersonal?.lname}`}
                </Title>
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
          </Space>
        </div>

        <Divider>
          <Title level={4} className="fw-normal m-0">
            Summary
          </Title>
        </Divider>

        <div className="ThemeOne__summary">
          {getPersonal?.summary && (
            <Paragraph className="fw-light m-0">{getPersonal?.summary}</Paragraph>
          )}
        </div>

        <Divider>
          <Title level={4} className="fw-normal m-0">
            Experience
          </Title>
        </Divider>

        <div className="ThemeOne__experiences">
          {getExperience?.length &&
            getExperience.map((exp, index, exps) => {
              const renderExperienceYear = () =>
                +exp.yrOfExp ? `${exp.yrOfExp} ${+exp.yrOfExp > 1 ? "Years" : "Year"}` : "";

              return (
                <React.Fragment key={`${exp.companyName}-${index}`}>
                  <div className="ThemeOne__experience">
                    <div className="ThemeOne__experienceHead">
                      <Title level={4} className="fs__md color__primary m-0">
                        <Space size={"small"}>
                          {exp.companyName}

                          <Badge
                            style={{
                              backgroundColor: "#1074CA",
                            }}
                            count={renderExperienceYear()}
                          />

                          {exp.startDate && (
                            <Tag icon={<CalendarOutlined />} className="rounded">
                              {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                            </Tag>
                          )}
                        </Space>
                      </Title>
                    </div>

                    <div className="ThemeOne__experienceBody">
                      <Title level={5} className="fs__sm color__gray mb-2">
                        {exp.position}
                      </Title>
                      {exp.responsibilities && (
                        <Paragraph className="ThemeOne__experienceDesc fw-light">
                          {exp.responsibilities}
                        </Paragraph>
                      )}
                    </div>
                  </div>

                  {index < exps.length - 1 ? <Divider /> : null}
                </React.Fragment>
              );
            })}
        </div>

        <Divider>
          <Title level={4} className="fw-normal m-0">
            Projects
          </Title>
        </Divider>

        <div className="ThemeOne__projects">
          {getProjects?.length &&
            getProjects.map((exp, index, projects) => {
              return (
                <React.Fragment key={`${exp.name}-${index}`}>
                  <div className="ThemeOne__project" key={`${exp.name}-${index}`}>
                    <div className="ThemeOne__projectHead mb-2">
                      <Title level={4} className="fs__md color__primary m-0">
                        {exp.name}
                      </Title>
                      <Text className="ThemeOne__projectOrg">
                        <BankOutlined className="icon me-1" />
                        {exp.organization}
                      </Text>
                    </div>

                    <div className="ThemeOne__projectBody">
                      {exp.description && (
                        <Paragraph className="fw-light">{exp.description}</Paragraph>
                      )}
                    </div>
                  </div>

                  {index < projects.length - 1 ? <Divider /> : null}
                </React.Fragment>
              );
            })}
        </div>

        <Divider>
          <Title level={4} className="fw-normal m-0">
            Skills
          </Title>
        </Divider>

        <div className="ThemeOne__skills">
          {getSkills?.length &&
            getSkills.map((skill) => (
              <Tag className="rounded py-1 px-2 mb-2" key={skill.value}>
                {skill.label}
              </Tag>
            ))}
        </div>

        <Divider>
          <Title level={4} className="fw-normal m-0">
            Education
          </Title>
        </Divider>

        <div className="ThemeOne__educations">
          {getEducation?.length &&
            orderBy(getEducation, ['year'], ['desc']).map((education, index, educations) => (
              <React.Fragment key={`${education.degree}-${index}`}>
                <div className="ThemeOne__education">
                  <div className="ThemeOne__educationHead">
                    <Title level={5} className="ThemeOne__educationTitle color__primary mb-0 me-2">
                      {education.degree}
                    </Title>

                    <Tag icon={<CalendarOutlined />} className="rounded">
                      {formatDate(education.year, "Y")}
                    </Tag>

                    <Tag color={"blue"} icon={<PercentageOutlined />} className="rounded">
                      {education.percentile}
                    </Tag>
                  </div>

                  <div className="ThemeOne__educationBody">
                    <Text className="color__gray fs__sm">{education.instituteName}</Text>
                  </div>
                </div>

                {index < educations.length - 1 ? <Divider /> : null}
              </React.Fragment>
            ))}
        </div>

        <Divider>
          <Title level={4} className="fw-normal m-0">
            Certification
          </Title>
        </Divider>

        <div className="ThemeOne__certifications">
          {getCertifications?.length &&
            getCertifications.map((cert, index, certs) => (
              <React.Fragment key={`${cert.certificateName}-${index}`}>
                <div className="ThemeOne__certification">
                  <div className="ThemeOne__certificationHead">
                    <Title
                      level={5}
                      className="ThemeOne__certificationTitle color__primary mb-0 me-2"
                    >
                      {cert.certificateName}
                    </Title>

                    <Tag icon={<CalendarOutlined />} className="rounded">
                      {formatDate(cert.startDate, "MM/YYYY")}
                      {!cert.isPermanent && ` - ${formatDate(cert.endDate, "MM/YYYY")}`}
                    </Tag>
                  </div>

                  <div className="ThemeOne__certificationBody">
                    <Text className="color__gray fs__sm">{cert.instituteName}</Text>
                  </div>
                </div>

                {index < certs.length - 1 ? <Divider /> : null}
              </React.Fragment>
            ))}
        </div>

        <Divider>
          <Title level={4} className="fw-normal m-0">
            Language proficiency
          </Title>
        </Divider>

        <div className="ThemeOne__langs">
          <Row gutter={16}>
            <Col span={8}>
              <div className="ThemeOne__lang">
                <Text className="fs__md mb-2">Bengali</Text>

                <Progress
                  className="mb-2"
                  type="circle"
                  width={80}
                  percent={getLanguages?.bengali}
                  format={(percent) => `${percent}%`}
                />

                <Text className="fs__xsm mb-0">
                  {languageStatusProvider(getLanguages?.bengali)}
                </Text>
              </div>
            </Col>

            <Col span={8}>
              <div className="ThemeOne__lang">
                <Text className="fs__md mb-2">English</Text>

                <Progress
                  className="mb-2"
                  type="circle"
                  width={80}
                  percent={getLanguages?.english}
                  format={(percent) => `${percent}%`}
                />

                <Text className="fs__xsm mb-0">
                  {languageStatusProvider(getLanguages?.english)}
                </Text>
              </div>
            </Col>

            <Col span={8}>
              <div className="ThemeOne__lang">
                <Text className="fs__md mb-2">Hindi</Text>

                <Progress
                  className="mb-2"
                  type="circle"
                  width={80}
                  percent={getLanguages?.hindi}
                  format={(percent) => `${percent}%`}
                />

                <Text className="fs__xsm mb-0">{languageStatusProvider(getLanguages?.hindi)}</Text>
              </div>
            </Col>
          </Row>
        </div>

        <Divider>
          <Title level={4} className="fw-normal m-0">
            Hobbies
          </Title>
        </Divider>

        <div className="ThemeOne__hobbies">
          <ul className="ThemeOne__hobbiesList m-0">
            {hobbies.length &&
              hobbies.map((hobby, index) => (
                <li className="ThemeOne__hobbiesItem" key={`${hobby}-${index}`}>
                  {hobby}
                </li>
              ))}
          </ul>
        </div>

        <Divider>
          <Title level={4} className="fw-normal m-0">
            Acknowledgement
          </Title>
        </Divider>

        <div className="ThemeOne__acknowledge">
          <Text className="fs__sm">
            I do hereby declare that above particular of information and fact stated are true,
            correct and complete to my knowledge and belief
          </Text>
        </div>
      </div>

      <div className="ThemeOne__btnGrp noprint">
        <button className="btn btn__secondary" onClick={goBack}>
          <RollbackOutlined />
          {/* Back */}
        </button>

        <button className="btn btn__secondary accent" onClick={manageCV}>
          <EditOutlined />
          {/* Edit */}
        </button>

        <button className="btn btn__primary" onClick={print}>
          <PrinterOutlined />
          {/* Print */}
        </button>
      </div>
    </section>
  );
};

export default ThemeOne;
