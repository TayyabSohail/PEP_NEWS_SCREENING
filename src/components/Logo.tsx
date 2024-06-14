import { Image } from "antd";

import logo from "../assets/icons/logo.svg";

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const Logo = ({ width, height, className }: LogoProps) => {
  return (
    <Image
      alt="Aawaz Logo"
      src={logo}
      width={width}
      height={height}
      className={className}
      preview={false}
    />
  );
};
