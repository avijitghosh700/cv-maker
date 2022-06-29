import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Row, Button, Col, Input } from "antd";
import { Rule } from "antd/lib/form";

import { EditOutlined, SaveOutlined } from "@ant-design/icons";

import { RootState } from "../../../store/store";
import { HobbiesModel, resetSubmitted, save, setSubmitted } from "../../../store/cv/hobbies/hobbiesSlice";

import { showToast } from "../../../shared/functions/toast";

import "./Hobbies.scss";

const hobbiesSchema: Record<string, Rule[]> = {
  hobbies: [{ required: true, message: "Hobbies are required." }],
};

const Hobbies = () => {
  const dispatch = useDispatch();

  const getHobbies = useSelector((state: RootState) => state.hobbies.data);
  const isHobbiesAdded = useSelector((state: RootState) => state.hobbies.isSubmitted);

  const [form] = Form.useForm();

  const initHobbies: HobbiesModel = {
    hobbies: getHobbies?.hobbies as string,
  };

  const saveHobbies = (data: any) => {
    const hobbies: HobbiesModel = { ...data };

    dispatch(save(hobbies));
    dispatch(setSubmitted());
    showToast('Hobbies', getHobbies);
  }

  const resetSubmitState = () => dispatch(resetSubmitted());

  return (
    <section className="Hobbies">
      <div className="Hobbies__head">
        <div
          className="Hobbies__heading
          border-bottom
          border-dark
          bottom-2
          pb-2"
        >
          <h2 className="h3 m-0">Hobbies</h2>
        </div>
      </div>

      <div className="Hobbies__body">
        <Form
          className="credential"
          form={form}
          layout="vertical"
          initialValues={initHobbies}
          onFinish={saveHobbies}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                hasFeedback
                name="hobbies"
                label="Enter hobbies"
                rules={hobbiesSchema.hobbies}
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

        {isHobbiesAdded && (
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

export default Hobbies;
