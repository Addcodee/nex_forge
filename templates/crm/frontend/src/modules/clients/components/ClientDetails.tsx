import Modal from "components/Modal";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const ClientDetails = ({ open, handleClose }: Props) => {
  return (
    <Modal open={open} onCancel={handleClose}>
      client details
    </Modal>
  );
};

export default ClientDetails;
