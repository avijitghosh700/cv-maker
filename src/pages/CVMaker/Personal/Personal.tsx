import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input, DatePicker, Form, Row, Button, Col, Upload, Modal, message } from "antd";
import ImgCrop, { ImgCropProps } from "antd-img-crop";
import { Rule } from "antd/lib/form";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import { EditOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

import moment from "moment";

import {
  PersonalModel,
  resetAvatar,
  resetSubmitted,
  save,
  setSubmitted,
} from "../../../store/cv/personal/personalSlice";

import { RootState } from "../../../store/store";

import { showToast } from "../../../shared/functions/toast";

import "./Personal.scss";
import { b64toFile } from "../../../shared/functions/utils";

const personalDetailSchema: Record<string, Rule[]> = {
  avatar: [],
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

  const [base64, setBase64] = React.useState<string>();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");

  const [form] = Form.useForm();

  const initPersonalDetail = {
    avatar: getPersonal?.avatar || null,
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

  const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // const getFile = (ev: any) => {
  //   console.log("Upload event:", ev);

  //   if (Array.isArray(ev)) {
  //     return ev;
  //   }
  //   return ev && ev.fileList;
  // };

  const handleCrop: ImgCropProps["onModalOk"] = async (file) => {
    const url = await getBase64(file as RcFile);
    setBase64(url);
  };

  const handleFileValidity: UploadProps["beforeUpload"] = (file: RcFile) => {
    const isUnder2mb: boolean = (file.size as number) / 1024 ** 2 <= 1.5;
    const isSupportedTypes: boolean =
      file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png";

    if (!isUnder2mb) {
      message.error(`${file.name} is more than 2mb`);
    }

    if (!isSupportedTypes) {
      message.error(`${file.name} is not supported`);
    }

    return isUnder2mb && isSupportedTypes;
  };

  // Main uploader event handler funtions
  const handleChange: UploadProps["onChange"] = async ({ file, fileList }) => {
    let flist = [...fileList];

    if (file.status === "uploading") {
      // setLoading(true);
      file.status = "done";
    }

    if (file.status === "done") {
      file.url = base64;
      setFileList(flist);
      console.log(flist);
    }

    if (file.status === "removed") {
      flist = flist.filter((fl) => fl.uid !== file.uid);
      setFileList(flist);
      dispatch(resetAvatar());
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const handleCancel = () => setPreviewVisible(false);
  // END

  const customReq = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const savePersonal = async (data: any) => {
    const personal: PersonalModel = {
      avatar: fileList[0],
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

  React.useEffect(() => {
    if (getPersonal?.avatar) {
      const avatarObj: UploadFile = { ...(getPersonal?.avatar as UploadFile) };
      
      if (avatarObj.url) {
        const file = b64toFile(avatarObj.url as string, avatarObj.name, avatarObj.type);
        avatarObj.originFileObj = file as RcFile;
  
        setFileList([avatarObj]);
        console.log(file);
      }
    }
  }, []);

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
            <Col span={24}>
              <Form.Item
                label="Avatar"
                valuePropName="avatar"
                // getValueFromEvent={getFile}
                rules={personalDetailSchema.avatar}
              >
                <ImgCrop rotate onModalOk={handleCrop}>
                  <Upload
                    className="Personal__upload"
                    name="avatar"
                    listType="picture-card"
                    fileList={[...fileList]}
                    maxCount={1}
                    accept="image/*"
                    customRequest={customReq}
                    beforeUpload={handleFileValidity}
                    onChange={handleChange}
                    onPreview={handlePreview}
                  >
                    <PlusOutlined className="icon me-1" />
                    Upload
                  </Upload>
                </ImgCrop>

                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
              </Form.Item>
            </Col>

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
