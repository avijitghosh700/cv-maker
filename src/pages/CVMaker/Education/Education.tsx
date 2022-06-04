import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Row, Col, Input, Button } from "antd";
import { Rule } from "antd/lib/form";

import { EditOutlined, SaveOutlined } from "@ant-design/icons";
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

import { showToast } from '../../../shared/functions/toast';

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
  const isEducationAdded = useSelector((state: RootState) => state.education.isSubmitted);

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
    dispatch(save(data.educations));
    dispatch(setSubmitted());
    showToast('Education', getEducation);
  };

  const resetSubmitState = () => dispatch(resetSubmitted());

  React.useEffect(() => {
    initEducationDetail.data = [...((getEducation as EducationBase[]) || [initEducationBase])];
  }, [initEducationDetail.data]);

  return (
    <section className="Education">
      <div className="Education__head">
        <div
          className="Education__heading
          border-bottom
          border-dark
          bottom-2
          pb-2"
        >
          <h2 className="h3 m-0">Education</h2>
        </div>
      </div>

      <div className="Education__body">
        <Form
          className="credential"
          form={form}
          layout={"vertical"}
          initialValues={initEducationDetail}
          onFinish={saveEducation}
        >
          <Form.List name={"educations"} initialValue={initEducationDetail.data as EducationBase[]}>
            {(fields, { add, remove }) => (
              <>
                {fields &&
                  fields.length &&
                  fields.map((field, index) => {
                    return (
                      <div className={`Experience__content mb-3`} key={field.key}>
                        <div className="Experience__subHeading pb-2">
                          <h5 className="h5 color color__primary m-0">
                            {`Education - ${index + 1}`}
                          </h5>

                          {index > 0 && (
                            <Button
                              danger
                              type={"primary"}
                              htmlType={"button"}
                              className="btn btn__utils red sm ms-auto"
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

        {isEducationAdded && (
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

export default Education;
