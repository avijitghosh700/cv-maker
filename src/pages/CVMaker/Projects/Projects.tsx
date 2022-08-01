import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Form, Input, Row, Select } from "antd";
import { Rule } from "antd/lib/form";

import { IoCloseOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

import { GeneralModel, RootState } from "../../../store/store";
import {
  ProjectsBase,
  remove,
  resetSubmitted,
  save,
  setSubmitted,
} from "../../../store/cv/projects/projectsSlice";

import { showToast } from "../../../shared/functions/toast";

import "./Projects.scss";

const projectsDetailSchema: Record<string, Rule[]> = {
  name: [{ required: true, message: "Project name is required." }],
  description: [{ required: true, message: "Description is required." }],
  organization: [{ required: true, message: "Organization is required." }],
};

const Projects = () => {
  const dispatch = useDispatch();

  const getExperience = useSelector((state: RootState) => state.experience.data);
  const getProjects = useSelector((state: RootState) => state.projects.data);
  const isProjectsAdded = useSelector((state: RootState) => state.projects.isSubmitted);

  const organizations: string[] = getExperience?.map((exp) => exp.companyName) as string[];

  const [form] = Form.useForm();
  const { Option } = Select;

  const initProjectsBase: ProjectsBase = {
    name: "",
    description: "",
    organization: "",
  };

  const initProjectsDetail: GeneralModel<ProjectsBase[]> = {
    data: [...((getProjects as ProjectsBase[]) || [initProjectsBase])],
  };

  const addProject = (proj: ProjectsBase, push: Function) => {
    push(proj);
    dispatch(resetSubmitted());
  };

  const removeProject = (index: number, removeProject: Function) => {
    const isPresentInStore: boolean | undefined = !!getProjects?.at(index);

    if (isPresentInStore) {
      const project: ProjectsBase = getProjects?.at(index) as ProjectsBase;

      if (project && Object.keys(project).length) dispatch(remove(project));

      removeProject(index);
    } else removeProject(index);
  };

  const saveProject = (data: any) => {
    dispatch(save(data.projects));
    dispatch(setSubmitted());
    showToast("Projects", getProjects);
  };

  const resetSubmitState = () => dispatch(resetSubmitted());

  React.useEffect(() => {
    initProjectsDetail.data = [...((getProjects as ProjectsBase[]) || [initProjectsBase])];
  }, [initProjectsDetail.data]);

  return (
    <section className="Projects mb-2">
      <div className="Projects__head">
        <div
          className="Projects__heading
          border-bottom
          border-dark
          bottom-2
          pb-2"
        >
          <h2 className="h3 m-0">Projects</h2>
        </div>
      </div>

      <div className="Projects__body">
        <Form
          className="credential"
          form={form}
          layout={"vertical"}
          initialValues={initProjectsDetail}
          onFinish={saveProject}
        >
          <Form.List name={"projects"} initialValue={initProjectsDetail.data as ProjectsBase[]}>
            {(fields, { add, remove }) => (
              <>
                {fields &&
                  fields.length &&
                  fields.map((field, index) => {
                    return (
                      <div className={`Experience__content mb-3`} key={field.key}>
                        <div className="Experience__subHeading pb-2">
                          <h5 className="h5 color color__primary m-0">
                            {`Project - ${index + 1}`}
                          </h5>

                          {index > 0 && (
                            <Button
                              danger
                              type={"primary"}
                              htmlType={"button"}
                              className="btn btn__utils red sm ms-auto"
                              onClick={() => removeProject(field.name, remove)}
                            >
                              <IoCloseOutline size={"20px"} />
                            </Button>
                          )}
                        </div>

                        <Row gutter={16}>
                          <Col span={24} md={12}>
                            <Form.Item
                              hasFeedback
                              label="Organization"
                              name={[field.name, "organization"]}
                              rules={projectsDetailSchema.organization}
                            >
                              <Select
                                className="credential__selectSingle"
                                placeholder="Select an organization"
                                allowClear
                                size={"large"}
                              >
                                <Option value="Freelance">Freelance</Option>
                                {organizations &&
                                  organizations.length &&
                                  organizations.map((org, index) => (
                                    <Option value={org} key={`${org}${index}`}>
                                      {org}
                                    </Option>
                                  ))}
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col span={24} md={12}>
                            <Form.Item
                              hasFeedback
                              label="Name"
                              name={[field.name, "name"]}
                              rules={projectsDetailSchema.name}
                            >
                              <Input className={"credential__input"} size={"large"} />
                            </Form.Item>
                          </Col>

                          <Col span={24}>
                            <Form.Item
                              hasFeedback
                              label="Description"
                              name={[field.name, "description"]}
                              rules={projectsDetailSchema.description}
                            >
                              <Input.TextArea className={"credential__textarea"} size={"large"} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}

                <Form.Item shouldUpdate className="m-0">
                  {() => (
                    <div className="Experience__btnGrp">
                      <button
                        type="button"
                        className="btn btn__secondary ms-auto"
                        onClick={() => addProject(initProjectsBase, add)}
                      >
                        <IoIosAdd size={"25px"} className="me-1" /> Add
                      </button>
                      <Button
                        htmlType="submit"
                        className="btn btn__primary"
                        disabled={form.getFieldsError().some(({ errors }) => errors.length)}
                      >
                        <SaveOutlined />
                        Save
                      </Button>
                    </div>
                  )}
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>

        {isProjectsAdded && (
          <div className="overlay">
            <Button className="btn btn__utils lg accent" onClick={resetSubmitState}>
              <EditOutlined />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
