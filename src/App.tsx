import { App as AntdApp, ConfigProvider } from "antd";

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
          }}
        >
          App
        </ConfigProvider>
      </div>
    </AntdApp>
  );
};
