import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { styles } from "../../assets/styles";

export const Loading = () => {
  return (
    <section className={`h-200 ${styles.section}`}>
      <div className=" h-full pt-60 flex flex-col gap-3 text-center">
        <p className={styles.cardTitle}>
          Please wait while the system processes your file
        </p>
        <p className={styles.date}>It may take few minutes</p>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    </section>
  );
};
