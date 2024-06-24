import { Button, ButtonProps } from "antd";

const LinkButton = (props: ButtonProps) => {
  return (
    <Button
      type="link"
      {...props}
      htmlType={props?.htmlType}
      onClick={props?.onClick}
      className={`w-fit h-fit p-0 font-medium text-black hover:!text-primary hover:!bg-transparent ${props?.className}`}
    >
      {props.children}
    </Button>
  );
};

export default LinkButton;
