import { App as AntdApp, ConfigProvider } from "antd";

import { Router } from "./Router";

export const App = () => {
  return (
    <AntdApp>
      <div className="App">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#085FAB",
              colorPrimaryBg: "#E5EDFF",
              colorBorder: "#085FAB",
              borderRadius: 6,
              colorText: "#454545",
              colorTextSecondary: "#454545",
            },
            components: {
              Table: {
                headerBg: "#FFFFFF",
                headerColor: "#085FAB",
              },
            },
          }}
        >
          <Router />
        </ConfigProvider>
      </div>
    </AntdApp>
  );
};
