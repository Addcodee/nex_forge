import { ButtonProps, Button as AntButton, ConfigProvider } from "antd";
import { ComponentToken } from "antd/es/button/style";

interface Props extends ButtonProps {
  config?: Partial<ComponentToken>;
}

const Button = ({ config, ...rest }: Props) => {
  return (
    <ConfigProvider theme={{ components: { Button: config } }}>
      <AntButton {...rest} />
    </ConfigProvider>
  );
};

export default Button;
