import { ModalProps, Modal as AntModal } from "antd";

interface Props extends ModalProps {}

const Modal = ({ closeIcon = false, ...rest }: Props) => {
  return <AntModal closeIcon={closeIcon} {...rest} />;
};

export default Modal;
