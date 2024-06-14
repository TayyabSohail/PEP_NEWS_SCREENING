import { Outlet } from "react-router-dom";

import { Layout as AntdLayout, Space } from "antd";

import { Header } from "../components/Header";

export const Layout = () => {
  return (
    <Space direction="vertical" className="w-full h-full min-h-screen">
      <AntdLayout className="w-full h-full bg-light_blue">
        {/* <Header /> */}
        <AntdLayout.Content className="h-full flex flex-col gap-y-10">
          <Outlet />
        </AntdLayout.Content>
      </AntdLayout>
    </Space>
  );
};
