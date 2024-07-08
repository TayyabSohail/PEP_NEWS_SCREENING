import { App as AntdApp, ConfigProvider } from "antd";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Router } from "./Router";

import { queryClient } from "./utils/react-query.service";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
    </QueryClientProvider>
  );
};
