import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Form, Row } from "antd";
import { Rule } from "antd/lib/form";

import { EditOutlined, SaveOutlined } from "@ant-design/icons";

import { RootState } from "../../../store/store";
import {
  resetSubmitted,
  save,
  setSubmitted,
  SkillsBase,
} from "../../../store/cv/skills/skillsSlice";

import DebounceSelect from "../../../components/DebouncedSelect/DebouncedSelect";

import { showToast } from "../../../shared/functions/toast";

import "./Skills.scss";
import { EMSISearchSkills } from "../../../shared/services/api";

const skillsDetailSchema: Record<string, Rule[]> = {
  skills: [{ required: true, message: "Skills is required." }],
};

const Skills = () => {
  const dispatch = useDispatch();

  const getSkills = useSelector((state: RootState) => state.skills.data);
  const isSkillsAdded = useSelector((state: RootState) => state.skills.isSubmitted);

  const [form] = Form.useForm();

  const [value, setValue] = React.useState<string>('');

  const initSkillsDetail = {
    skills: getSkills?.skills || [],
  };

  const saveSkills = (data: any) => {
    const skills: SkillsBase = { ...data };

    dispatch(save(skills));
    dispatch(setSubmitted());
    showToast("Skills", getSkills);
  };

  const resetSubmitState = () => dispatch(resetSubmitted());

  return (
    <section className="Skills mb-2">
      <div className="Skills__head">
        <div
          className="Skills__heading
          border-bottom
          border-dark
          bottom-2
          pb-2"
        >
          <h2 className="h3 m-0">Skills</h2>
        </div>
      </div>

      <div className="Skills__body">
        <Form
          className="credential"
          form={form}
          layout="vertical"
          initialValues={initSkillsDetail}
          onFinish={saveSkills}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item hasFeedback label="Skills" name="skills" rules={skillsDetailSchema.skills}>
                <DebounceSelect
                  showSearch
                  size={"large"}
                  mode={"multiple"}
                  value={value}
                  placeholder={"Select skill(s)"}
                  className={"credential__select"}
                  debounceTimeout={300}
                  limit={20}
                  onChange={(newValue: any) => setValue(newValue)}
                  fetchOptions={EMSISearchSkills}
                />
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

        {isSkillsAdded && (
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

export default Skills;
