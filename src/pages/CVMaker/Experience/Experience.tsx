import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Badge, Button, Checkbox, Col, DatePicker, Form, Input, Row } from "antd";
import { Rule } from "antd/lib/form";

import moment from "moment";

import { EditOutlined, SaveOutlined } from "@ant-design/icons";
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

import { showToast } from "../../../shared/functions/toast";

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
  startDate: [
    { required: true, message: "Start date is required." },
    { type: "date", message: "Invalid date." },
  ],
  endDate: [
    { required: true, message: "End date is required." },
    { type: "date", message: "Invalid date." },
  ],
  current: [{ type: "boolean" }],
  responsibilities: [],
};

const Experience = () => {
  const dispatch = useDispatch();

  const getExperiences = useSelector((state: RootState) => state.experience.data);
  const isExperiencesSaved = useSelector((state: RootState) => state.experience.isSubmitted);

  const currentValues =
    getExperiences?.reduce((values: boolean[], exp) => {
      values.push(exp.current);
      return values;
    }, []) || [];

  const expYrValues =
    getExperiences?.reduce((values: string[], exp) => {
      values.push(exp.yrOfExp);
      return values;
    }, []) || [];

  const [isCurrent, setIsCurrent] = React.useState<boolean[]>(currentValues);
  const [year, setYear] = React.useState<string[]>(expYrValues);

  const [form] = Form.useForm();

  const initExperienceBase: ExperienceBase = {
    companyName: "",
    position: "",
    responsibilities: "",
    startDate: "",
    endDate: "",
    yrOfExp: "",
    current: false,
  };

  const dateMapper = (data: ExperienceBase): ExperienceBase => ({
    ...data,
    startDate: moment(data.startDate),
    endDate: data.endDate ? moment(data.endDate) : "",
    yrOfExp: data.endDate
      ? moment(data.endDate).diff(moment(data.startDate), "years").toString()
      : "",
  });

  const initExperienceDetail: GeneralModel<ExperienceBase[]> = {
    data: [...((getExperiences as ExperienceBase[])?.map(dateMapper) || [initExperienceBase])],
  };

  const setCurrentState = (index: number, value: boolean) => {
    const { experiences } = form.getFieldsValue();

    if (value) {
      Object.assign(experiences[index], { endDate: "" });

      setYear((years) => {
        years[index] = "0";
        return [...years];
      });
    } else {
      Object.assign(experiences[index], {
        endDate: getExperiences?.at(index)?.endDate
          ? moment(getExperiences?.at(index)?.endDate)
          : "",
      });
    }

    form.setFieldsValue({ experiences });

    setIsCurrent((isCurrent) => {
      isCurrent[index] = value;
      return [...isCurrent];
    });
  };

  const setExperienceYear = (index: number) => {
    const { experiences } = form.getFieldsValue();
    const startDate: string = experiences[index].startDate
      ? moment(experiences[index].startDate).format()
      : "";
    const endDate: string = experiences[index].endDate
      ? moment(experiences[index].endDate).format()
      : "";

    if (endDate) {
      const diff = moment(endDate).diff(moment(startDate), "years").toString();

      setYear((years) => {
        years[index] = diff;
        return [...years];
      });
    }
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
    console.log(data);

    dispatch(save(data.experiences.map(dateMapper)));
    dispatch(setSubmitted());
    showToast("Experience", getExperiences);
  };

  const resetSubmitState = () => dispatch(resetSubmitted());

  React.useEffect(() => {
    initExperienceDetail.data = [...((getExperiences as ExperienceBase[]) || [initExperienceBase])];
  }, [initExperienceDetail]);

  return (
    <section className="Experience">
      <div className="Experience__head">
        <div
          className="Experience__heading 
          border-bottom
          border-dark
          bottom-2
          pb-2"
        >
          <h2 className="h3 m-0">Experience</h2>
        </div>
      </div>

      <div className="Experience__body">
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
                    const renderExperienceYear = () =>
                      +year[index] ? `${year[index]} ${+year[index] > 1 ? "Years" : "Year"}` : "";

                    return (
                      <div className={`Experience__content mb-3`} key={field.key}>
                        <div className="Experience__subHeading pb-2">
                          <h5 className="h5 color color__primary m-0">
                            {`Experience - ${index + 1}`}
                          </h5>
                          
                          <Badge
                            className="me-auto ms-2"
                            style={{
                              backgroundColor: "#1074CA",
                            }}
                            count={renderExperienceYear()}
                          />

                          {index > 0 && (
                            <Button
                              danger
                              type={"primary"}
                              htmlType={"button"}
                              className="btn btn__utils red sm ms-auto"
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

                          <Col span={24} sm={12}>
                            <Form.Item
                              hasFeedback
                              label="Start date"
                              name={[field.name, "startDate"]}
                              rules={experienceDetailSchema.startDate}
                            >
                              <DatePicker
                                className={"credential__input w-100"}
                                picker={"month"}
                                placeholder={"Select start month"}
                                format={"MM/YY"}
                                size={"large"}
                                onChange={() => setExperienceYear(index)}
                              />
                            </Form.Item>
                          </Col>

                          {!isCurrent[index] && (
                            <Col span={24} sm={12}>
                              <Form.Item
                                hasFeedback
                                label="End date"
                                name={[field.name, "endDate"]}
                                rules={experienceDetailSchema.endDate}
                              >
                                <DatePicker
                                  className={"credential__input w-100"}
                                  picker={"month"}
                                  placeholder={"Select end month"}
                                  format={"MM/YY"}
                                  size={"large"}
                                  onChange={() => setExperienceYear(index)}
                                />
                              </Form.Item>
                            </Col>
                          )}

                          <Col span={24}>
                            <Form.Item
                              hasFeedback
                              name={[field.name, "current"]}
                              valuePropName="checked"
                              rules={experienceDetailSchema.current}
                            >
                              <Checkbox
                                checked={false}
                                onChange={(ev) => setCurrentState(index, ev.target.checked)}
                              >
                                Currently working here?
                              </Checkbox>
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

        {isExperiencesSaved && (
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

export default Experience;
