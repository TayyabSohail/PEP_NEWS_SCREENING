import { useState, useEffect } from "react";

import { Image, Form, Input } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

import { PrimaryButton } from "./Button";

import loginImage from "../assets/images/login.png";
import logoImage from "../assets/icons/logo.svg";

import { styles } from "../assets/styles";

interface LoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const [form] = Form.useForm();

  // Submittable state for form submit button
  const [submittable, setSubmittable] = useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

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
        <Image preview={false} src={logoImage} alt="Logo Image" width={"30%"} />

        {/* Page Title */}
        <h2 className={styles.heading3}>PEP Adverse NEWS Screening</h2>
        <h3 className={styles.heading4}>Login</h3>

        <Form
          form={form}
          name="LoginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
          className="w-full flex flex-col items-center gap-5"
          scrollToFirstError
          autoComplete="off"
        >
          {/* Email */}
          <Form.Item<LoginData>
            name="email"
            label={<span className={styles.label}>Email</span>}
            className="min-w-[50%] m-0"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "The input is not valid email!",
              },
            ]}
          >
            <Input
              placeholder="Please enter your email"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item<LoginData>
            name="password"
            className="min-w-[50%] m-0"
            label={<span className={styles.label}>Password</span>}
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              placeholder="Please enter your password"
              prefix={<KeyOutlined />}
            />
          </Form.Item>

          <PrimaryButton
            htmlType="submit"
            className={`${!submittable && styles.disabled}`}
            disabled={!submittable}
          >
            Login
          </PrimaryButton>
        </Form>
      </div>
    </div>
  );
};
