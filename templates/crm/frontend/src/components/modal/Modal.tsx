import { ModalProps, Modal as AntModal } from "antd";

interface Props extends ModalProps {}

const Modal = ({ closeIcon = false, ...rest }: Props) => {
  return <AntModal footer={false} closeIcon={closeIcon} {...rest} />;
};

export default Modal;
