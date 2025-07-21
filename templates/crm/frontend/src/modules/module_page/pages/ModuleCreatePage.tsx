import { message } from "antd";
import { useForm } from "antd/es/form/Form";
import Button from "components/button/Button";
import ModuleForm from "module_page/components/ModuleForm";
import { useCreateModule } from "module_page/hooks/useCreateModule";
import { ModulePayload } from "module_page/types/ModuleType";
import { useState } from "react";
import { SaveLoadingType, StatusType } from "shared/lib/types";

const ModuleCreatePage = () => {
  const [form] = useForm<ModulePayload>();
  const { mutateAsync } = useCreateModule();
  const [loading, setLoading] = useState<SaveLoadingType | null>(null);
  const [contextApi, contextHolder] = message.useMessage();

  const onFinish = async (values: ModulePayload) => {
    const res = await mutateAsync(values);

    if (res.status === StatusType.SUCCESS) {
      contextApi.success("Module успешно создан");

      if (loading === "save-continue") {
        form.resetFields();
      } else {
        window.location.href = "/module";
      }
    }

    if (res.status === StatusType.ERROR) {
      contextApi.error(res.error);
    }

    setLoading(null);
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {contextHolder}
      <div className="p-5 flex items-start justify-between bg-white rounded-lg">
        <h3 className="text-[24px] font-medium">Создание module</h3>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setLoading("save-continue");
              form.submit();
            }}
            loading={loading === "save-continue"}
            type="primary"
          >
            Сохранить и продолжить
          </Button>
          <Button
            onClick={() => {
              setLoading("save");
              form.submit();
            }}
            loading={loading === "save"}
            className="!bg-emerald-500"
            type="primary"
          >
            Сохранить
          </Button>
        </div>
      </div>

      <div className="p-5 bg-white rounded-lg h-[calc(100vh-150px)] overflow-hidden overflow-y-auto">
        <ModuleForm form={form} onFinish={onFinish} />
      </div>
    </div>
  );
};

export default ModuleCreatePage;
