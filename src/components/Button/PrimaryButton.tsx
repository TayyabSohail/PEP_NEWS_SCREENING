import { Button, ButtonProps } from "antd";

const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      htmlType={props?.htmlType}
      onClick={props?.onClick}
      className={`w-fit font-medium px-8 py-4 bg-primary text-white rounded-full ${props?.className}`}
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
