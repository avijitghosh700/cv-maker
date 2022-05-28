import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Form, Input, Row } from "antd";
import { Rule } from "antd/lib/form";

import { IoIosAdd } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import { RootState, GeneralModel } from "../../../store/store";
import {
  ExperienceBase,
  remove,
  resetSubmitted,
  save,
  setSubmitted,
} from "../../../store/cv/experience/experienceSlice";

import "./Experience.scss";

const experienceDetailSchema: Record<string, Rule[]> = {
  companyName: [
    { required: true, message: "Company name is required." },
    { pattern: new RegExp(/^(?!.*  )[a-zA-Z ]*$/, "gi"), message: "Only alphabets are allowed." },
  ],
  position: [
    { required: true, message: "Title is required." },
    { pattern: new RegExp(/^(?!.*  )[a-zA-Z ]*$/, "gi"), message: "Only alphabets are allowed." },
  ],
  responsibilities: [],
};

const Experience = () => {
  const dispatch = useDispatch();

  const getExperiences = useSelector((state: RootState) => state.experience.data);

  const [form] = Form.useForm();

  const initExperienceBase: ExperienceBase = {
    companyName: "",
    position: "",
    responsibilities: "",
  };

  const initExperienceDetail: GeneralModel<ExperienceBase[]> = {
    data: [...((getExperiences as ExperienceBase[]) || [initExperienceBase])],
  };

  const addExperience = (exp: ExperienceBase, push: Function) => {
    push(exp);
    dispatch(resetSubmitted());
  };

  const removeExperience = (index: number, removeField: Function) => {
    const isPresentInStore: boolean | undefined = !!getExperiences?.at(index);

    if (isPresentInStore) {
      const experience: ExperienceBase = getExperiences?.at(index) as ExperienceBase;

      if (experience && Object.keys(experience).length) dispatch(remove(experience));

      removeField(index);
    } else removeField(index);
  };

  const saveExperience = (data: any) => {
    console.log(data.experiences);

    dispatch(save(data.experiences));
    dispatch(setSubmitted());
  };

  React.useEffect(() => {
    initExperienceDetail.data = [...((getExperiences as ExperienceBase[]) || [initExperienceBase])];
  }, [initExperienceDetail]);

  return (
    <section className="Experience mb-3">
      <div
        className="Experience__heading
        border-bottom
        border-dark
        bottom-2
        mb-3
        pb-2"
      >
        <h2 className="h3 m-0">Experience</h2>
      </div>

      <Form
        className="credential"
        form={form}
        layout={"vertical"}
        initialValues={initExperienceDetail}
        onFinish={saveExperience}
      >
        <Form.List
          name={"experiences"}
          initialValue={initExperienceDetail.data as ExperienceBase[]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields &&
                fields.length &&
                fields.map((field, index) => {
                  return (
                    <div className={`Experience__content mb-3`} key={field.key}>
                      <div className="Experience__subHeading pb-2">
                        <h5 className="h5 color color__primary m-0">
                          {`Experience - ${index + 1}`}
                        </h5>

                        {index > 0 && (
                          <Button
                            danger
                            type={"primary"}
                            htmlType={"button"}
                            className="btn btn__utils red ms-auto"
                            onClick={() => removeExperience(field.name, remove)}
                          >
                            <IoCloseOutline size={"20px"} />
                          </Button>
                        )}
                      </div>

                      <Row gutter={16}>
                        <Col span={24} sm={12}>
                          <Form.Item
                            hasFeedback
                            label="Company name"
                            name={[field.name, "companyName"]}
                            rules={experienceDetailSchema.companyName}
                          >
                            <Input className={"credential__input"} size={"large"} />
                          </Form.Item>
                        </Col>

                        <Col span={24} sm={12}>
                          <Form.Item
                            hasFeedback
                            label="Position"
                            name={[field.name, "position"]}
                            rules={experienceDetailSchema.position}
                          >
                            <Input className={"credential__input"} size={"large"} />
                          </Form.Item>
                        </Col>

                        <Col span={24}>
                          <Form.Item
                            hasFeedback
                            style={{ marginBottom: 0 }}
                            label="Responsibilities"
                            name={[field.name, "responsibilities"]}
                            rules={experienceDetailSchema.responsibilities}
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
                      onClick={() => addExperience(initExperienceBase, add)}
                    >
                      <IoIosAdd size={"25px"} className="me-1" /> Add
                    </button>
                    <Button
                      htmlType="submit"
                      className="btn btn__primary"
                      disabled={form.getFieldsError().some(({ errors }) => errors.length)}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </section>
  );
};

export default Experience;
