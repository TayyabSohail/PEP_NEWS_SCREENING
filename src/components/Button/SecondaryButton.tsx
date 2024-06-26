import { Button, ButtonProps } from "antd";

const SecondaryButton = (props: ButtonProps) => {
  return (
    <Button
      type="primary"
      {...props}
      htmlType={props?.htmlType}
      onClick={props?.onClick}
      className={`w-fit font-medium px-8 py-4 bg-white text-primary border-primary rounded-full ${props?.className}`}
    >
      {props.children}
    </Button>
  );
};

export default SecondaryButton;
