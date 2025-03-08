import Modal from "components/Modal";
import ClientForm from "./ClientForm";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const CreateClient = ({ open, handleClose }: Props) => {
  return (
    <Modal open={open} onCancel={handleClose}>
      <ClientForm />
    </Modal>
  );
};

export default CreateClient;
