import { ConfigProvider } from "antd";

type Props = {
  children?: React.ReactNode;
};

const ADProvider = ({ children }: Props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#5856D6",
          colorError: "#ff3b30",
          lineWidth: 1,
          colorBorder: "#E5E7EB",
          colorText: "black",
          borderRadius: 8,
        },
        components: {
          Modal: {
            colorBgMask: "transparent",
          },

          Typography: {
            titleMarginBottom: 0,
          },
          Form: {
            itemMarginBottom: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ADProvider;
