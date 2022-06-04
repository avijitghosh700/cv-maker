import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input, DatePicker, Form, Row, Button, Col, message } from "antd";
import { Rule } from "antd/lib/form";

import { EditOutlined, SaveOutlined } from "@ant-design/icons";

import moment from "moment";

import { PersonalModel, resetSubmitted, save, setSubmitted } from "../../../store/cv/personal/personalSlice";

import { RootState } from "../../../store/store";

import { showToast } from "../../../shared/functions/toast";

import "./Personal.scss";

const personalDetailSchema: Record<string, Rule[]> = {
  firstname: [
    { required: true, message: "Firstname is requred." },
    { pattern: new RegExp(/^(?!.*  )[a-zA-Z ]*$/, "gi"), message: "Only alphabets are allowed." },
  ],
  lastname: [
    { required: true, message: "Lastname is requred." },
    { pattern: new RegExp(/^(?!.*  )[a-zA-Z ]*$/, "gi"), message: "Only alphabets are allowed." },
  ],
  position: [
    { required: true, message: "Position is requred." },
    { pattern: new RegExp(/^(?!.*  )[a-zA-Z ]*$/, "gi"), message: "Only alphabets are allowed." },
  ],
  email: [
    { required: true, message: "Email is requred." },
    { type: "email", message: "Invalid email." },
  ],
  phone: [
    { required: true, message: "Phone number is required." },
    { min: 8, message: "Minimum 8 digits." },
    { max: 10, message: "Maximum 10 digits." },
  ],
  dob: [{ required: true, message: "Date of birth is required." }],
  linkedin: [],
  github: [],
  summary: [{ required: true, message: "Summary is required." }],
};

const Personal = () => {
  const dispatch = useDispatch();

  const getPersonal = useSelector((state: RootState) => state.personal.data);
  const isPersonalAdded = useSelector((state: RootState) => state.personal.isSubmitted);

  const [form] = Form.useForm();

  const initPersonalDetail = {
    firstname: getPersonal?.fname || "",
    lastname: getPersonal?.lname || "",
    position: getPersonal?.position || "",
    email: getPersonal?.email || "",
    phone: getPersonal?.phone || "",
    dob: getPersonal?.dob ? moment(getPersonal?.dob) : "",
    linkedin: getPersonal?.linkedin || "",
    github: getPersonal?.github || "",
    summary: getPersonal?.summary || "",
  };

  const savePersonal = (data: any) => {
    const personal: PersonalModel = {
      fname: data.firstname,
      lname: data.lastname,
      email: data.email,
      phone: data.phone,
      dob: moment(data.dob).format("YYYY-MM-DD"),
      position: data.position,
      summary: data.summary,
      linkedin: data.linkedin,
      github: data.github,
    };

    console.log(personal);

    dispatch(save(personal));
    dispatch(setSubmitted());
    showToast("Personal", getPersonal);
  };

  const resetSubmitState = () => dispatch(resetSubmitted());

  return (
    <section className="Personal mb-2">
      <div className="Personal__head">
        <div
          className="Personl__heading
          border-bottom
          border-dark
          bottom-2
          pb-2"
        >
          <h2 className="h3 m-0">Personal Details</h2>
        </div>
      </div>

      <div className="Personal__body">
        <Form
          className="credential"
          form={form}
          layout="vertical"
          initialValues={initPersonalDetail}
          onFinish={savePersonal}
        >
          <Row gutter={16}>
            <Col span={24} sm={12}>
              <Form.Item
                hasFeedback
                label="Firstname"
                name="firstname"
                rules={personalDetailSchema.firstname}
              >
                <Input className={"credential__input"} size={"large"} />
              </Form.Item>
            </Col>

            <Col span={24} sm={12}>
              <Form.Item
                hasFeedback
                label="Lastname"
                name="lastname"
                rules={personalDetailSchema.lastname}
              >
                <Input className={"credential__input"} size={"large"} />
              </Form.Item>
            </Col>

            <Col span={24} sm={12}>
              <Form.Item
                hasFeedback
                label="Position"
                name="position"
                rules={personalDetailSchema.position}
              >
                <Input className={"credential__input"} size={"large"} />
              </Form.Item>
            </Col>

            <Col span={24} sm={12}>
              <Form.Item hasFeedback label="Email" name="email" rules={personalDetailSchema.email}>
                <Input className={"credential__input"} size={"large"} />
              </Form.Item>
            </Col>

            <Col span={24} sm={12}>
              <Form.Item hasFeedback label="Phone" name="phone" rules={personalDetailSchema.phone}>
                <Input className={"credential__input"} size={"large"} />
              </Form.Item>
            </Col>

            <Col span={24} sm={12}>
              <Form.Item
                hasFeedback
                label="Date of Birth"
                name="dob"
                rules={personalDetailSchema.dob}
              >
                <DatePicker
                  className={"credential__input w-100"}
                  format={"DD/MM/YYYY"}
                  size={"large"}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                hasFeedback
                label="Linked In"
                name="linkedin"
                rules={personalDetailSchema.linkedin}
              >
                <Input className={"credential__input"} size={"large"} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                hasFeedback
                label="Github"
                name="github"
                rules={personalDetailSchema.github}
              >
                <Input className={"credential__input"} size={"large"} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                hasFeedback
                label="Summary"
                name="summary"
                rules={personalDetailSchema.summary}
              >
                <Input.TextArea className={"credential__textarea"} size={"large"} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item shouldUpdate className="m-0">
                {() => (
                  <div className="Personal__btnGrp">
                    <Button
                      htmlType="submit"
                      className="btn btn__primary ms-auto"
                      disabled={form.getFieldsError().some(({ errors }) => errors.length)}
                    >
                      <SaveOutlined />
                      Save
                    </Button>
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {isPersonalAdded && (
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

export default Personal;
