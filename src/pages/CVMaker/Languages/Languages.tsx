import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Row, Button, Col, Slider } from "antd";
import { Rule } from "antd/lib/form";
import { SliderMarks } from "antd/lib/slider";

import { EditOutlined, SaveOutlined } from "@ant-design/icons";

import { RootState } from "../../../store/store";
import {
  LanguageModel,
  resetSubmitted,
  save,
  setSubmitted,
} from "../../../store/cv/languages/languagesSlice";

import { languageStatusProvider } from "../../../shared/functions/utils";
import { showToast } from "../../../shared/functions/toast";

import "./Languages.scss";

const languageSchema: Record<string, Rule[]> = {
  bengali: [],
  english: [],
  hindi: [],
};

const Languages = () => {
  const dispatch = useDispatch();

  const getLanguage = useSelector((state: RootState) => state.languages.data);
  const isLanguageAdded = useSelector((state: RootState) => state.languages.isSubmitted);

  const [form] = Form.useForm();

  const initLanguageDetail = {
    bengali: getLanguage?.bengali,
    english: getLanguage?.english,
    hindi: getLanguage?.hindi,
  };

  const marks: SliderMarks = {
    0: "0",
    20: "20",
    40: "40",
    60: "60",
    80: "80",
    100: "100",
  };

  const saveLanguage = (data: any) => {
    const language: LanguageModel = {
      bengali: data.bengali,
      english: data.english,
      hindi: data.hindi,
    };

    console.log(language);

    dispatch(save(language));
    dispatch(setSubmitted());
    showToast("Languages", getLanguage);
  };

  const resetSubmitState = () => dispatch(resetSubmitted());

  return (
    <section className="Languages">
      <div className="Languages__head">
        <div
          className="Languages__heading
          border-bottom
          border-dark
          bottom-2
          pb-2"
        >
          <h2 className="h3 m-0">Language proficiency</h2>
        </div>
      </div>

      <div className="Languages__body">
        <Form
          className="credential"
          form={form}
          layout="vertical"
          initialValues={initLanguageDetail}
          onFinish={saveLanguage}
        >
          <Row gutter={16}>
            <Col span={24} md={8}>
              <Form.Item name="bengali" label="Bengali" rules={languageSchema.bengali}>
                <Slider step={20} marks={marks} tipFormatter={languageStatusProvider} />
              </Form.Item>
            </Col>

            <Col span={24} md={8}>
              <Form.Item name="english" label="English" rules={languageSchema.english}>
                <Slider step={20} marks={marks} tipFormatter={languageStatusProvider} />
              </Form.Item>
            </Col>

            <Col span={24} md={8}>
              <Form.Item name="hindi" label="Hindi" rules={languageSchema.hindi}>
                <Slider step={20} marks={marks} tipFormatter={languageStatusProvider} />
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

        {isLanguageAdded && (
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

export default Languages;
