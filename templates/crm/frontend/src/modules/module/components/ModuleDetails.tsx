import DeleteButton from "components/DeleteButton";
import EditButton from "components/EditButton";
import Modal from "components/Modal";
import ReviewButton from "components/ReviewButton";
import { useGetModuleDetails } from "module/hooks/useGetModuleDetails";
import { useModuleStore } from "module/store/useModuleStore";
import { useState } from "react";
import ModuleForm from "./ModuleForm";
import { useDeleteModule } from "module/hooks/useDeleteModule";
import { message } from "antd";
import ErrorMessages from "shared/lib/consts/errors";
import { StatusType } from "shared/lib/types/StatusType";
import SuccessMessages from "shared/lib/consts/success";
import Label from "components/Label";
import { useUpdateModule } from "module/hooks/useUpdateModule";
import { ModulePayload } from "module/types/ModuleType";

type Props = {
  open: boolean;
  handleClose: () => void;
  id: string | null;
};

const ClientDetails = ({ open, handleClose, id }: Props) => {
  const { isPending: detailsPending } = useGetModuleDetails(id);
  const { moduleDetails } = useModuleStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { mutateAsync: deleteAsync, isPending: deletePending } =
    useDeleteModule();
  const { mutateAsync: updateAsync, isPending: updatePending } =
    useUpdateModule(id);
  const [contextApi, contextHolder] = message.useMessage();

  const deleteModule = async () => {
    if (id === null) {
      return contextApi.error(ErrorMessages.NoIdFound);
    }

    const res = await deleteAsync(id);

    if (res.status === StatusType.SUCCESS) {
      contextApi.success(SuccessMessages.Delete);
      handleClose();
    }

    if (res.status === StatusType.ERROR) {
      return contextApi.error(res.error);
    }
  };

  const updateModule = async (payload: ModulePayload) => {
    const res = await updateAsync(payload);

    if (res.status === StatusType.SUCCESS) {
      contextApi.success(SuccessMessages.Update);
      handleClose();
    }

    if (res.status === StatusType.ERROR) {
      return contextApi.error(res.error);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal loading={detailsPending} open={open} onCancel={handleClose}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[24px] font-bold">
              {isEditing ? "Редактирование " : ""}Module
            </h3>
            <div className="flex gap-1">
              <DeleteButton
                onClick={() => deleteModule()}
                loading={deletePending}
              />
              <EditButton onClick={() => setIsEditing(true)} />
              <ReviewButton onClick={() => setIsEditing(false)} />
            </div>
          </div>
          <div className="">
            {isEditing ? (
              <ModuleForm
                values={moduleDetails}
                handleClose={() => {
                  handleClose();
                  setIsEditing(false);
                }}
                handleSubmit={updateModule}
                loading={updatePending}
              />
            ) : (
              <div className="flex flex-col gap-2">
                <Label label="Заголовок">{moduleDetails?.title}</Label>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ClientDetails;
