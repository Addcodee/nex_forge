import { Button, Form, FormInstance, Input } from "antd";
import { ModulePayload } from "module/types";
import { useEffect } from "react";

type Props = {
  handleSubmit: (
    payload: ModulePayload,
    form?: FormInstance<ModulePayload>
  ) => void;
  loading: boolean;
  handleClose: () => void;
  values?: ModulePayload | null;
};

const ModuleForm = ({ loading, handleSubmit, handleClose, values }: Props) => {
  const [form] = Form.useForm<ModulePayload>();

  const onFinish = async (values: ModulePayload) => {
    // Значения формы уже прошли валидацию
    handleSubmit(values, form);
  };

  const cancel = () => {
    handleClose();
    if (values) {
      form.setFieldValue("title", values.title);
      handleClose();
    }
  };

  useEffect(() => {
    if (values) {
      form.setFieldValue("title", values.title);
    }
  }, [values]);

  return (
    <Form
      form={form}
      name="module-form"
      className="flex flex-col gap-4"
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Введите заголовок" }]}
      >
        <Input placeholder="Заголовок" />
      </Form.Item>

      <div className="flex flex-col gap-1">
        <Form.Item>
          <Button
            htmlType="submit"
            loading={loading}
            className="w-full"
            type="primary"
          >
            Сохранить
          </Button>
        </Form.Item>
        <Button onClick={cancel} className="w-full">
          Отмена
        </Button>
      </div>
    </Form>
  );
};

export default ModuleForm;
