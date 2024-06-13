
import news from "../assets/images/login.png"
 import { ChangeEvent,useState } from "react";
import mainlogo from "../assets/icons/logo.svg"
import { Form, Input } from "antd";
 import { PrimaryButton } from "./Button/PrimaryButton";
//import { useAntdUseApp } from "../hooks/useAntdUseApp";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Image } from "antd";

export const Login = () => {
    const [formData, setFormData] = useState({
      Email: '',
      password:''
    });
    const [form] = Form.useForm();
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    const isFormComplete = formData.Email && formData.password;

  return (
    <div className=" flex h-screen">
       <div className=" flex w-1/2 h-full ">
        <img className=" flex object-cover h-full"  src={news} />
      </div>
      <div className="flex justify-center w-1/2 h-full ">
     

      <Form
        form={form}
        name="LoginForm"
        initialValues={{ remember: true }}
       // onFinish={onFinish}
        size="middle"
        layout="vertical"
        className=" flex flex-col justify-center items-center gap-5"
        scrollToFirstError
      >
        {/* Page Title */}
        <Image className="w-auto h-auto" src={mainlogo}/>
        <h2 className="m-0 p-0 font-lato font-bold text-[28px]  text-primary  ">PEP Adverse NEWS Screening</h2>
        <h3 className="m-0 p-0 font-lato font-bold text-[18px]  text-primary">Login</h3>
        {/* Email */}
        

        <Form.Item
          name="bank_POC_email"
          label={
            <span className="w-full text-left m-0 p-0 font-lato font-bold text-[16px] leading-[24px]  text-black">Email</span>
          }
          className="w-full m-0"
          rules={[
            {
              type: "email",
              message: "The input is not valid email!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
            
          <Input
            placeholder="Email*"
            className="!bg-[transparent] [&>input]:!bg-[transparent]"
            prefix={<UserOutlined />}
            onChange={handleInputChange}
            name="Email"
          />
        </Form.Item>
     
        {/* Password */}
        <Form.Item
          name="bank_password"
          className="w-full m-0"
          label={
            <span className="w-full text-left m-0 p-0 font-lato font-bold text-[16px] leading-[24px]  text-black"> Password</span>
          }
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Password*"
            className="!bg-[transparent] [&>input]:!bg-[transparent]"
            prefix={<KeyOutlined />}
             onChange={handleInputChange}
            name="password"
          />
        </Form.Item>

      <PrimaryButton htmlType="submit"  className={!isFormComplete ? "opacity-40":"opacity-100" }>Log In</PrimaryButton>
      </Form>
        
      </div>
    
   
    </div>
  )
}


