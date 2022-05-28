import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Row, Col, Input, Button } from "antd";
import { Rule } from "antd/lib/form";

import { IoIosAdd } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import { RootState, GeneralModel } from "../../../store/store";
import {
  EducationBase,
  remove,
  resetSubmitted,
  save,
  setSubmitted,
} from "../../../store/cv/education/educationSlice";

import "./Education.scss";

const educationDetailSchema: Record<string, Rule[]> = {
  instituteName: [
    { required: true, message: "Institute name is required." },
    { pattern: new RegExp(/^(?!.*  )[a-zA-Z ]*$/, "gi"), message: "Only alphabets are allowed." },
  ],
  degree: [
    { required: true, message: "Degree is required." },
    { pattern: new RegExp(/^(?!.*  )[a-zA-Z ]*$/, "gi"), message: "Only alphabets are allowed." },
  ],
  percentile: [
    { required: true, message: "Percentile is required." },
    { pattern: new RegExp(/^[0-9.]*$/, "gi"), message: "Only numerics are allowed." },
  ],
};

const Education = () => {
  const dispatch = useDispatch();

  const getEducation = useSelector((state: RootState) => state.education.data);

  const [form] = Form.useForm();

  const initEducationBase: EducationBase = {
    instituteName: "",
    percentile: "",
    degree: "",
  };

  const initEducationDetail: GeneralModel<EducationBase[]> = {
    data: [...((getEducation as EducationBase[]) || [initEducationBase])],
  };

  const addEducation = (ed: EducationBase, push: Function) => {
    push(ed);
    dispatch(resetSubmitted());
  };

  const removeEducation = (index: number, removeField: Function) => {
    const isPresentInStore: boolean | undefined = !!getEducation?.at(index);

    if (isPresentInStore) {
      const experience: EducationBase = getEducation?.at(index) as EducationBase;

      if (experience && Object.keys(experience).length) dispatch(remove(experience));

      removeField(index);
    } else removeField(index);
  };

  const saveEducation = (data: any) => {
    console.log(data);

    dispatch(save(data.educations));
    dispatch(setSubmitted());
  };

  React.useEffect(() => {
    initEducationDetail.data = [
      ...((getEducation as EducationBase[]) || [initEducationBase]),
    ];
  }, [initEducationDetail.data]);

  return (
    <section className="Education">
      <div
        className="Education__heading
        border-bottom
        border-dark
        bottom-2
        mb-3
        pb-2"
      >
        <h2 className="h3 m-0">Education</h2>
      </div>

      <Form
        className="credential"
        form={form}
        layout={"vertical"}
        initialValues={initEducationDetail}
        onFinish={saveEducation}
      >
        <Form.List
          name={"educations"}
          initialValue={initEducationDetail.data as EducationBase[]}
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
                            onClick={() => removeEducation(field.name, remove)}
                          >
                            <IoCloseOutline size={"20px"} />
                          </Button>
                        )}
                      </div>

                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            hasFeedback
                            label="Institute name"
                            name={[field.name, "instituteName"]}
                            rules={educationDetailSchema.instituteName}
                          >
                            <Input className={"credential__input"} size={"large"} />
                          </Form.Item>
                        </Col>

                        <Col span={24} sm={12}>
                          <Form.Item
                            hasFeedback
                            label="Degree"
                            name={[field.name, "degree"]}
                            rules={educationDetailSchema.degree}
                          >
                            <Input className={"credential__input"} size={"large"} />
                          </Form.Item>
                        </Col>

                        <Col span={24} sm={12}>
                          <Form.Item
                            hasFeedback
                            style={{ marginBottom: 0 }}
                            label="Percentile"
                            name={[field.name, "percentile"]}
                            rules={educationDetailSchema.percentile}
                          >
                            <Input className={"credential__input"} size={"large"} />
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
                      onClick={() => addEducation(initEducationBase, add)}
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

      {/* <Formik
        initialValues={initEducationDetail}
        validationSchema={educationDetailSchema}
        onSubmit={(values, { resetForm }) => {
          if (values.educations && values.educations.length) {
            saveEducation(values.educations);
            // resetForm();
          }
        }}
      >
        {({ values, isValid }) => {
          return (
            <Form className="credential">
              <FieldArray name="educations">
                {({ insert, remove, push }) => (
                  <div className="row">
                    {values.educations &&
                      values.educations.length > 0 &&
                      values.educations.map((experience, index) => {
                        return (
                          <div className="col-12" key={index}>
                            <div className={`Education__content mb-3`}>
                              <div className="Education__subHeading pb-2">
                                <h5 className="h5 color color__primary m-0">
                                  {`Education - ${index + 1}`}
                                </h5>

                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn__utils red ms-auto"
                                    onClick={() => removeExperience(experience, index, remove)}
                                  >
                                    <IoCloseOutline size={"20px"} />
                                  </button>
                                )}
                              </div>

                              <div className="row gx-3">
                                <div className="col-12">
                                  <div className="form-group mb-3">
                                    <label htmlFor={`educations.${index}.instituteName`}>
                                      Institute
                                    </label>
                                    <Field
                                      type="text"
                                      name={`educations.${index}.instituteName`}
                                      value={experience.instituteName}
                                      className={`form-control credential__input`}
                                    />

                                    <ErrorMessage
                                      name={`educations.${index}.instituteName`}
                                      component="span"
                                      className="error"
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group mb-3">
                                    <label htmlFor={`educations.${index}.degree`}>
                                      Secondary/Higher Secondary/Degree
                                    </label>
                                    <Field
                                      type="text"
                                      name={`educations.${index}.degree`}
                                      value={experience.degree}
                                      className={`form-control credential__input`}
                                    />

                                    <ErrorMessage
                                      name={`educations.${index}.degree`}
                                      component="span"
                                      className="error"
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor={`educations.${index}.percentile`}>
                                      Percentile
                                    </label>
                                    <Field
                                      type="text"
                                      name={`educations.${index}.percentile`}
                                      value={experience.percentile}
                                      className={`form-control credential__input`}
                                    />
                                    <ErrorMessage
                                      name={`educations.${index}.percentile`}
                                      component="span"
                                      className="error"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    <div className="Education__btnGrp">
                      <button
                        type="button"
                        className="btn btn__secondary ms-auto"
                        onClick={() => addControl(initEducationBase, push)}
                      >
                        <IoIosAdd size={"25px"} className="me-1" /> Add
                      </button>
                      <button type="submit" className="btn btn__primary" disabled={!isValid}>
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </Form>
          );
        }}
      </Formik> */}
    </section>
  );
};

export default Education;
