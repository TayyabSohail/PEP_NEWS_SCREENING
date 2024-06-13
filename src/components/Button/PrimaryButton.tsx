
import { Button, ButtonProps } from "antd";
export const PrimaryButton = (props : ButtonProps) => {
  return (
    <Button {...props} htmlType={props?.htmlType}  onClick={props?.onClick}   className={`font-semibold font-lato mt-3 px-6 py-5 bg-primary text-white rounded-full ${props?.className}`}>
         {props.children} 
         </Button>
  )
}

