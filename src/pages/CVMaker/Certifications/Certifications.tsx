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
  CertificationsBase,
  remove,
  resetSubmitted,
  save,
  setSubmitted,
} from "../../../store/cv/certifications/certificationsSlice";

import { showToast } from "../../../shared/functions/toast";

import "./Certifications.scss";

const certificateDetailSchema: Record<string, Rule[]> = {
  certificateName: [
    { required: true, message: "Certificate name is required." },
    { pattern: new RegExp(/^(?!.*  )[a-zA-Z()& ]*$/, "gi"), message: "Only alphabets are allowed." },
  ],
  instituteName: [
    { required: true, message: "Institution name is required." },
    { pattern: new RegExp(/^(?!.*  )[a-zA-Z()& ]*$/, "gi"), message: "Only alphabets are allowed." },
  ],
  startDate: [
    { required: true, message: "Start date is required." },
    { type: "date", message: "Invalid date." },
  ],
  endDate: [
    { required: true, message: "End date is required." },
    { type: "date", message: "Invalid date." },
  ],
  isExpirable: [{ type: "boolean" }],
  responsibilities: [],
};

const Certifications = () => {
  const dispatch = useDispatch();

  const getCertifications = useSelector((state: RootState) => state.certifications.data);
  const isCertificationsSaved = useSelector((state: RootState) => state.certifications.isSubmitted);

  const expiryValue =
    getCertifications?.reduce((values: boolean[], cert) => {
      values.push(cert.isExpirable);
      return values;
    }, []) || [];

  const [isCurrent, setIsCurrent] = React.useState<boolean[]>(expiryValue);

  const [form] = Form.useForm();

  const initCertificationsBase: CertificationsBase = {
    certificateName: "",
    instituteName: "",
    startDate: "",
    endDate: "",
    isExpirable: false,
  };

  const dateMapper = (data: CertificationsBase): CertificationsBase => ({
    ...data,
    startDate: moment(data.startDate),
    endDate: data.endDate ? moment(data.endDate) : "",
  });

  const initCertificationsDetail: GeneralModel<CertificationsBase[]> = {
    data: [
      ...((getCertifications as CertificationsBase[])?.map(dateMapper) || [initCertificationsBase]),
    ],
  };

  const setCurrentState = (index: number, value: boolean) => {
    const { certificates } = form.getFieldsValue();

    if (value) {
      Object.assign(certificates[index], { endDate: "" });
    } else {
      Object.assign(certificates[index], {
        endDate: getCertifications?.at(index)?.endDate
          ? moment(getCertifications?.at(index)?.endDate)
          : "",
      });
    }

    form.setFieldsValue({ certificates });

    setIsCurrent((isCurrent) => {
      isCurrent[index] = value;
      return [...isCurrent];
    });
  };

  const addCertfication = (cert: CertificationsBase, push: Function) => {
    push(cert);
    dispatch(resetSubmitted());
  };

  const removeCertfication = (index: number, removeField: Function) => {
    const isPresentInStore: boolean | undefined = !!getCertifications?.at(index);

    if (isPresentInStore) {
      const certification: CertificationsBase = getCertifications?.at(index) as CertificationsBase;

      if (certification && Object.keys(certification).length) dispatch(remove(certification));

      removeField(index);
    } else removeField(index);
  };

  const saveCertification = (data: any) => {
    console.log(data);

    dispatch(save(data.certificates.map(dateMapper)));
    dispatch(setSubmitted());
    showToast("Certificate", getCertifications);
  };

  const resetSubmitState = () => dispatch(resetSubmitted());

  React.useEffect(() => {
    initCertificationsDetail.data = [...((getCertifications as CertificationsBase[]) || [initCertificationsBase])];
  }, [initCertificationsDetail]);

  return (
    <section className="Experience mb-2">
      <div className="Experience__head">
        <div
          className="Experience__heading 
          border-bottom
          border-dark
          bottom-2
          pb-2"
        >
          <h2 className="h3 m-0">Certification</h2>
        </div>
      </div>

      <div className="Experience__body">
        <Form
          className="credential"
          form={form}
          layout={"vertical"}
          initialValues={initCertificationsDetail}
          onFinish={saveCertification}
        >
          <Form.List
            name={"certificates"}
            initialValue={initCertificationsDetail.data as CertificationsBase[]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields &&
                  fields.length &&
                  fields.map((field, index) => {
                    return (
                      <div className={`Experience__content mb-3`} key={field.key}>
                        <div className="Experience__subHeading mb-3">
                          <h5 className="h5 color color__primary m-0">
                            {`Certificate - ${index + 1}`}
                          </h5>

                          {index > 0 && (
                            <Button
                              danger
                              type={"primary"}
                              htmlType={"button"}
                              className="btn btn__utils red sm ms-auto"
                              onClick={() => removeCertfication(field.name, remove)}
                            >
                              <IoCloseOutline size={"20px"} />
                            </Button>
                          )}
                        </div>

                        <Row gutter={16}>
                          <Col span={24}>
                            <Form.Item
                              hasFeedback
                              label="Certificate name"
                              name={[field.name, "certificateName"]}
                              rules={certificateDetailSchema.certificateName}
                            >
                              <Input className={"credential__input"} size={"large"} />
                            </Form.Item>
                          </Col>

                          <Col span={24}>
                            <Form.Item
                              hasFeedback
                              label="Institute name"
                              name={[field.name, "instituteName"]}
                              rules={certificateDetailSchema.instituteName}
                            >
                              <Input className={"credential__input"} size={"large"} />
                            </Form.Item>
                          </Col>

                          <Col span={24} sm={12}>
                            <Form.Item
                              hasFeedback
                              label="Start date"
                              name={[field.name, "startDate"]}
                              rules={certificateDetailSchema.startDate}
                            >
                              <DatePicker
                                className={"credential__input w-100"}
                                picker={"month"}
                                placeholder={"Select start month"}
                                format={"MM/YY"}
                                size={"large"}
                              />
                            </Form.Item>
                          </Col>

                          {!isCurrent[index] && (
                            <Col span={24} sm={12}>
                              <Form.Item
                                hasFeedback
                                label="End date"
                                name={[field.name, "endDate"]}
                                rules={certificateDetailSchema.endDate}
                              >
                                <DatePicker
                                  className={"credential__input w-100"}
                                  picker={"month"}
                                  placeholder={"Select end month"}
                                  format={"MM/YY"}
                                  size={"large"}
                                />
                              </Form.Item>
                            </Col>
                          )}

                          <Col span={24}>
                            <Form.Item
                              hasFeedback
                              name={[field.name, "isExpirable"]}
                              valuePropName="checked"
                              rules={certificateDetailSchema.isExpirable}
                              className={"mb-0"}
                            >
                              <Checkbox
                                checked={false}
                                onChange={(ev) => setCurrentState(index, ev.target.checked)}
                              >
                                No expiration.
                              </Checkbox>
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
                        onClick={() => addCertfication(initCertificationsBase, add)}
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

        {isCertificationsSaved && (
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

export default Certifications;
