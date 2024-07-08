import { useNavigate } from "react-router-dom";

import { Layout, Dropdown, Avatar, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

import { logout } from "../api/auth.api";

import { Logo } from "./Logo";

import { ROUTES } from "../constants/routes";

type MenuItem = Required<MenuProps>["items"][number];

export const Header = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "Profile",
      icon: <UserOutlined className="!text-lg" />,
      key: ROUTES.profile,
      onClick: () => navigate(ROUTES.profile),
    },
    {
      label: "Logout",
      icon: <LogoutOutlined className="!text-lg" />,
      key: "/logout",
      onClick: () => logout(),
    },
  ];

  return (
    <Layout.Header className="!z-10 !sticky !top-0 !w-full h-[7vh] px-10 flex justify-between items-center bg-light_blue shadow-lg">
      <Logo className="!h-[3vh]" />

      <Space direction="vertical">
        <Dropdown
          menu={{
            items,
            selectable: true,
            inlineIndent: 20,
            className: "!p-2 flex flex-col gap-y-2 shadow-lg",
          }}
        >
          <Avatar icon={<UserOutlined />} className="shadow-lg" />
        </Dropdown>
      </Space>
    </Layout.Header>
  );
};
