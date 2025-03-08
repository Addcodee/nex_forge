import { Divider, TableColumnsType } from "antd";
import ClientDetails from "clients/components/ClientDetails";
import CreateClient from "clients/components/CreateClient";
import { MOCK_DATA } from "clients/consts/mock_data";
import { OPTIONS, SORT_OPTIONS } from "clients/consts/options";
import { ClientItem } from "clients/types/ClientType";
import Button from "components/Button";
import SearchField from "components/SearchField";
import Select from "components/Select";
import Switch from "components/Switch";
import Table from "components/Table";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { useGlobalStore } from "shared/lib/store/useGlobalStore";

const ClientsPage = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const { setDashboardHidden } = useGlobalStore();
  const columns: TableColumnsType<ClientItem> = [
    {
      key: "full_name",
      dataIndex: "full_name",
      title: "ФИО",
    },

    {
      key: "phone_number",
      dataIndex: "phone_number",
      title: "Номер телефона",
    },

    {
      key: "is_active",
      dataIndex: "is_active",
      title: "Активность",
      render: (value) => <Switch defaultChecked={value} />,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="bg-white p-5 flex-1 rounded-lg flex flex-col">
          <div className="flex justify-between sm:items-center gap-2">
            <div className="flex gap-2 flex-1 sm:flex-row flex-col sm:max-w-full max-w-[320px]">
              <SearchField />
              <Button
                onClick={() => setIsCreating(true)}
                className="!font-medium"
              >
                Добавить клиента
              </Button>
            </div>

            <Button
              className="lg:!hidden"
              onClick={() => setDashboardHidden((prev) => !prev)}
            >
              <LuMenu />
            </Button>
          </div>

          <Divider className="!my-4" />

          <div className="flex gap-2 sm:flex-row flex-col">
            <Select
              className="max-w-[320px] w-full"
              placeholder="Сортировать по:"
              options={OPTIONS}
            />
            <Select
              className="max-w-[320px] w-full"
              placeholder="Порядок"
              options={SORT_OPTIONS}
            />
          </div>
        </div>
        <Table columns={columns} dataSource={MOCK_DATA} scroll={{ x: 1024 }} />
      </div>

      <CreateClient
        open={isCreating}
        handleClose={() => setIsCreating(false)}
      />
      <ClientDetails
        open={currentId !== null}
        handleClose={() => setCurrentId(null)}
      />
    </>
  );
};

export default ClientsPage;
