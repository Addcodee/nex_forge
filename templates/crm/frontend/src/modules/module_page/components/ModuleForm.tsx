import { Form, FormInstance, Input } from "antd";
import { ModulePayload } from "module_page/types/ModuleType";

type Props = {
  form: FormInstance<ModulePayload>;
  onFinish: (values: ModulePayload) => void;
};

const ModuleForm = ({ form, onFinish }: Props) => {
  return (
    <Form
      name="module"
      onFinish={onFinish}
      form={form}
      layout="vertical"
      className="flex flex-col gap-5"
    >
      <Form.Item label="Заголовок" name="title">
        <Input placeholder="Заголовок" />
      </Form.Item>
    </Form>
  );
};

export default ModuleForm;
