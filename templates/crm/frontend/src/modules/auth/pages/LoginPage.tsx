import { Form, Input } from "antd";
import { useLogin } from "auth/hooks/useLogin";
import { LoginForm } from "auth/types/LoginForm";
import Button from "components/Button";
import ValidateMessages from "shared/lib/consts/validates";
import { StatusType } from "shared/lib/types/StatusType";

const LoginPage = () => {
  const { mutateAsync, isPending } = useLogin();
  const [form] = Form.useForm<LoginForm>();

  const onFinish = async (values: LoginForm) => {
    const response = await mutateAsync(values);

    console.log(response);

    if (response.status === StatusType.ERROR) {
      return form.setFields([{ name: "password", errors: [response.error] }]);
    }
  };
  return (
    <div className="h-screen bg-slate-200 flex items-center justify-center p-4">
      <div className="p-5 bg-white rounded-lg flex flex-col gap-6 max-w-[420px] w-full">
        <h2 className="text-[32px] font-medium text-center">Вход в систему</h2>

        <Form
          className="flex flex-col gap-4"
          name="login-form"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="email"
            rules={[{ message: ValidateMessages.Email, required: true }]}
          >
            <Input disabled={isPending} placeholder="E-Mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ message: ValidateMessages.Password, required: true }]}
          >
            <Input.Password disabled={isPending} placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={isPending}
              className="w-full"
              type="primary"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
