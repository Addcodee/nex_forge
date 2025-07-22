import Modal from "components/modal";
import DeleteButton from "components/delete-button";
import EditButton from "components/edit-button";
import ReviewButton from "components/review-button";
import ModuleForm from "./ModuleForm";
import Label from "components/label";

import { message } from "antd";

import { useGetModuleDetails } from "module/hooks";
import { useDeleteModule } from "module/hooks";
import { useUpdateModule } from "module/hooks";
import { useModuleStore } from "module/store";

import { StatusType } from "shared/lib/types";
import { ModulePayload } from "module/types";

import { SuccessMessages } from "shared/lib/consts";
import { ErrorMessages } from "shared/lib/consts";

import { useState } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  id: string | null;
};

const ModuleDetails = ({ open, handleClose, id }: Props) => {
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
      setIsEditing(false);
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

export default ModuleDetails;
