import { useState } from "react";
import { DatePicker, Space, Form, Upload, Button, Image } from "antd";

import {
  CalendarTwoTone,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PrimaryButton } from "../components/Button/PrimaryButton";

import loginImage from "../assets/images/login.png";
import logoImage from "../assets/icons/logo.svg";

import { styles } from "../assets/styles";

export const Home = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    file: null,
    startDate: null,
    endDate: null,
  });

  const handleFileUpload = (file) => {
    console.log("Uploaded file:", file);
    setFormData((prevState) => ({ ...prevState, file: file }));
    return false;
  };

  const handleStartDateChange = (date, dateString) => {
    setFormData((prevState) => ({ ...prevState, startDate: dateString }));
  };

  const handleEndDateChange = (date, dateString) => {
    setFormData((prevState) => ({ ...prevState, endDate: dateString }));
  };

  const handleRemoveFile = () => {
    setFormData((prevState) => ({ ...prevState, file: null }));
  };

  const isFormComplete =
    (formData.file && formData.startDate && formData.endDate) ?? false;

  const onFinish = () => {
    // TODO: Implement login functionality
  };

  return (
    <div className="w-full h-screen flex">
      <Image
        preview={false}
        src={loginImage}
        alt="Login Image"
        height={"100%"}
        width={"50%"}
        className="object-cover"
      />

      <div className="w-1/2 h-full flex flex-col justify-center items-center p-10 gap-5">
        {/* Logo */}
        <Image preview={false} src={logoImage} alt="Logo Image" width={"20%"} />

        {/* Page Title */}
        <h2 className={styles.heading3}>PEP Adverse NEWS Screening</h2>
        <h3 className={styles.heading4}>PEP and High Risk Entities Upload</h3>

        <Form
          form={form}
          name="PepUploadForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
          className="w-full flex flex-col items-center gap-5"
          scrollToFirstError
          autoComplete="off"
        >
          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex gap-5">
              <Space direction="vertical" className="w-1/2">
                <label className="text-sm font-medium  text-black mb-1">
                  Starting Date
                </label>
                <DatePicker
                  className="w-full border border-gray rounded-md p-2"
                  onChange={handleStartDateChange}
                  suffixIcon={<CalendarTwoTone className="text-gray text-lg" />}
                />
              </Space>
              <Space direction="vertical" className="w-1/2">
                <label className="text-sm font-medium  text-black mb-1">
                  Ending Date
                </label>
                <DatePicker
                  className="w-full border border-gray rounded-md p-2"
                  onChange={handleEndDateChange}
                  suffixIcon={<CalendarTwoTone className="text-gray text-lg" />}
                />
              </Space>
            </div>

            <Form.Item
              name="meta_data"
              valuePropName="file"
              rules={[
                {
                  required: true,
                  message: "Please upload the accounts information",
                },
              ]}
              className="m-0 w-full"
            >
              {formData.file ? (
                <div className=" bg-blue rounded-lg p-4">
                  <p className=" text-sm font-medium text-black mb-1">
                    Uploaded File: {formData.file.name}
                  </p>
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2 text-black"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <Upload.Dragger
                  accept=".xlsx,.csv,.xls"
                  beforeUpload={handleFileUpload}
                  maxCount={1}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    <h2 className="text-sm font-medium text-black mb-1">
                      Upload Screening List
                    </h2>
                  </p>
                </Upload.Dragger>
              )}
            </Form.Item>

            <h2 className="text-sm font-medium text-black text-center">
              Download List Template?
            </h2>
          </div>
          <PrimaryButton
            htmlType="submit"
            disabled={!isFormComplete}
            className={`${
              isFormComplete ? "" : "!text-white !bg-primary !opacity-50"
            }`}
          >
            Upload
          </PrimaryButton>
        </Form>
      </div>
    </div>
  );
};
