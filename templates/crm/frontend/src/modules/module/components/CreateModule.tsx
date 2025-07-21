import Modal from "components/modal";
import ModuleForm from "./ModuleForm";
import { useCreateModule } from "module/hooks/useCreateModule";
import { ModulePayload } from "module/types/ModuleType";
import { message } from "antd";
import { StatusType } from "shared/lib/types/StatusType";
import SuccessMessages from "shared/lib/consts/success";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const CreateModule = ({ open, handleClose }: Props) => {
  const { mutateAsync, isPending } = useCreateModule();
  const [contextApi, contextHolder] = message.useMessage();

  const createModule = async (payload: ModulePayload) => {
    const res = await mutateAsync(payload);

    if (res.status === StatusType.SUCCESS) {
      contextApi.success(SuccessMessages.Create);
      handleClose();
    }

    if (res.status === StatusType.ERROR) {
      return contextApi.error(res.error);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal open={open} onCancel={handleClose}>
        <div className="flex flex-col gap-4">
          <h3 className="text-[24px] font-bold">Создание Module</h3>

          <ModuleForm
            handleClose={handleClose}
            handleSubmit={createModule}
            loading={isPending}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreateModule;
