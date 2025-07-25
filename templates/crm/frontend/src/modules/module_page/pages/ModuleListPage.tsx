import Button from "components/button";
import SearchField from "components/search-field";
import Select from "components/select";
import Table from "components/table";

import { Divider, message, TableColumnsType } from "antd";
import { LuMenu } from "react-icons/lu";

import { useGetModuleList, useDeleteManyModuleItems } from "module/hooks";
import { useGlobalStore } from "shared/lib/store";
import { useModuleStore } from "module/store";

import { OrderingType } from "shared/lib/types";
import { ModuleItem, ModuleSortType } from "module/types";

import { SuccessMessages } from "shared/lib/consts";
import { OPTIONS, SORT_OPTIONS } from "module/consts";

import { Link } from "react-router-dom";
import { useState } from "react";

const ModuleListPage = () => {
  const [contextApi, contextHolder] = message.useMessage();
  const { setDashboardHidden } = useGlobalStore();
  const { mutateAsync, isPending: deletePending } = useDeleteManyModuleItems();
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<{
    sort: ModuleSortType;
    order: OrderingType;
  }>({
    sort: ModuleSortType.CREATED_AT,
    order: OrderingType.ASC,
  });
  const [search, setSearch] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { isPending } = useGetModuleList({ page, sort, search });
  const { moduleList } = useModuleStore();

  const columns: TableColumnsType<ModuleItem> = [
    {
      key: "title",
      dataIndex: "title",
      title: "Заголовок",
      render: (text, rec) => (
        <Link to={`/module/edit/${rec.id}`}>
          <Button type="link" className="!p-0 !h-fit">
            {text}
          </Button>
        </Link>
      ),
    },
  ];

  const handleDelete = async () => {
    const res = await mutateAsync(selectedItems);

    if (res.length === 0) {
      contextApi.success(SuccessMessages.Delete);
      setSelectedItems([]);
    } else {
      contextApi.error(
        `Ошибка при удалении следующих объектов: ${res.join(", ")}`
      );
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedItems,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedItems(selectedRowKeys as string[]);
    },
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col gap-4 p-4">
        <div className="bg-white p-5 flex-1 rounded-lg flex flex-col">
          <div className="flex justify-between sm:items-center gap-2">
            <div className="flex gap-2 flex-1 sm:flex-row flex-col sm:max-w-full max-w-[320px]">
              <SearchField onSearch={(value) => setSearch(value)} />
              <Link to={"/module/create"}>
                <Button className="!font-medium">Добавить module</Button>
              </Link>
              <Button
                loading={deletePending}
                onClick={handleDelete}
                disabled={selectedItems.length === 0}
                className="!font-medium"
                danger
              >
                Удалить выбранное
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
              onChange={(val) => setSort((prev) => ({ ...prev, sort: val }))}
              className="max-w-[320px] w-full"
              placeholder="Сортировать по:"
              options={OPTIONS}
            />
            <Select
              onChange={(val) => setSort((prev) => ({ ...prev, order: val }))}
              className="max-w-[320px] w-full"
              placeholder="Порядок"
              options={SORT_OPTIONS}
            />
          </div>
        </div>
        <Table
          rowSelection={rowSelection}
          rowKey={(rec) => rec.id}
          pagination={{
            current: page,
            total: moduleList.count,
            pageSize: 15,
            onChange: (value) => setPage(value),
          }}
          loading={isPending}
          columns={columns}
          dataSource={moduleList.results}
          scroll={{ x: 1024 }}
        />
      </div>
    </>
  );
};

export default ModuleListPage;
