import { Divider, TableColumnsType } from "antd";
import ModuleDetails from "module/components/ModuleDetails";
import CreateModule from "module/components/CreateModule";
import { ModuleItem, ModuleSortType } from "module/types/ModuleType";
import Button from "components/Button";
import SearchField from "components/SearchField";
import Select from "components/Select";
import Table from "components/Table";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { useGlobalStore } from "shared/lib/store/useGlobalStore";
import { useGetModules } from "module/hooks/useGetModules";
import { useModuleStore } from "module/store/useModuleStore";
import { OPTIONS, SORT_OPTIONS } from "module/consts/options";
import { OrderingType } from "shared/lib/types/OrderingType";

const ModulePage = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<{
    sort: ModuleSortType;
    order: OrderingType;
  }>({
    sort: ModuleSortType.CREATED_AT,
    order: OrderingType.ASC,
  });
  const [search, setSearch] = useState<string>("");

  const { isPending } = useGetModules(page, sort, search);
  const { modules } = useModuleStore();
  const { setDashboardHidden } = useGlobalStore();
  const columns: TableColumnsType<ModuleItem> = [
    {
      key: "title",
      dataIndex: "title",
      title: "Заголовок",
      render: (text, rec) => (
        <Button
          onClick={() => setCurrentId(rec.id)}
          type="link"
          className="!p-0 !h-fit"
        >
          {text}
        </Button>
      ),
    },
  ];

  console.log(search);

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="bg-white p-5 flex-1 rounded-lg flex flex-col">
          <div className="flex justify-between sm:items-center gap-2">
            <div className="flex gap-2 flex-1 sm:flex-row flex-col sm:max-w-full max-w-[320px]">
              <SearchField onSearch={(value) => setSearch(value)} />
              <Button
                onClick={() => setIsCreating(true)}
                className="!font-medium"
              >
                Добавить module
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
          rowKey={(rec) => rec.id}
          pagination={{
            current: page,
            total: modules.count,
            pageSize: 15,
            onChange: (value) => setPage(value),
          }}
          loading={isPending}
          columns={columns}
          dataSource={modules.results}
          scroll={{ x: 1024 }}
        />
      </div>

      <CreateModule
        open={isCreating}
        handleClose={() => setIsCreating(false)}
      />
      <ModuleDetails
        id={currentId}
        open={currentId !== null}
        handleClose={() => setCurrentId(null)}
      />
    </>
  );
};

export default ModulePage;
