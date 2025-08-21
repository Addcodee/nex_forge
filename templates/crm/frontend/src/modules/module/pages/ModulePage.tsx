import Button from "components/button";
import Select from "components/select";
import Table from "components/table";
import Input from "components/input";
import RefetchButton from "components/refetch-button";
import { CreateModule, ModuleDetails } from "module/components";

import { Divider, message, TableColumnsType } from "antd";
import { LuMenu } from "react-icons/lu";

import { useGetModuleList, useDeleteManyModuleItems } from "module/hooks";
import { useGlobalStore } from "shared/lib/store";
import { useModuleStore } from "module/store";

import { OrderingType } from "shared/lib/types";
import { ModuleItem, ModuleSearchType, ModuleSortType } from "module/types";

import { SuccessMessages } from "shared/lib/consts";
import { OPTIONS, SORT_OPTIONS } from "module/consts";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchState } from "shared/lib/hooks";

const ModulePage = () => {
  const [contextApi, contextHolder] = message.useMessage();
  const { setDashboardHidden } = useGlobalStore();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [currentId, setCurrentId] = useSearchState<string | null>(
    "currentId",
    null
  );
  const { mutateAsync, isPending: deletePending } = useDeleteManyModuleItems();
  const [page, setPage] = useSearchState<number>("page", 1);
  const [sort, setSort] = useSearchState<{
    sort: ModuleSortType;
    order: OrderingType;
  }>("sort", {
    sort: ModuleSortType.CREATED_AT,
    order: OrderingType.ASC,
  });

  const [search, setSearch] = useSearchState<ModuleSearchType>("q", {
    title: "",
  });
  const [debouncedSearch] = useDebounce(search, 500);
  const [pageSize, setPageSize] = useSearchState<number>("pageSize", 15);
  const { isPending, refetch, isRefetching } = useGetModuleList({
    page,
    sort,
    search: debouncedSearch,
    pageSize,
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { moduleList } = useModuleStore();
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const allColumns: TableColumnsType<ModuleItem> = [
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
    {
      key: "description",
      dataIndex: "description",
      title: "Описание",
    },
  ];

  const [showedcolumns, setShowedColumns] = useSearchState<string[]>(
    "showedColumns",
    allColumns.map((item) => item.key as string)
  );

  const columns = allColumns.filter((item) =>
    showedcolumns.includes(item.key as string)
  );

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

  const handleFilterChange = (
    value: string,
    fieldName: keyof ModuleSearchType
  ) => {
    setSearch((prev) => ({ ...prev, [fieldName]: value }));
    setPage(1);
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col gap-4 p-4">
        <div className="bg-white p-5 flex-1 rounded-lg flex flex-col">
          <div className="flex justify-between sm:items-center gap-2">
            <div className="flex gap-2 items-center flex-1 sm:flex-row flex-col sm:max-w-full max-w-[320px] justify-between">
              <h2 className="text-[32px] font-medium">Module</h2>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <RefetchButton
                    refetcher={refetch}
                    loading={isPending || isRefetching}
                  />
                  <Button
                    type="primary"
                    onClick={() => setIsCreating(true)}
                    className="!font-medium"
                  >
                    Добавить
                  </Button>
                </div>
                {selectedItems.length > 0 ? (
                  <Button
                    loading={deletePending}
                    onClick={handleDelete}
                    disabled={selectedItems.length < 1}
                    className="!font-medium"
                    danger
                  >
                    Удалить выбранное
                  </Button>
                ) : null}
              </div>
            </div>

            <Button
              className="lg:!hidden"
              onClick={() => setDashboardHidden((prev) => !prev)}
            >
              <LuMenu />
            </Button>
          </div>

          <Divider className="!my-4" />

          <div className="flex justify-between flex-wrap">
            <div className="flex gap-2 sm:flex-row flex-col flex-1">
              <Select
                label="Сортировать по:"
                value={sort.sort}
                onChange={(val) => setSort((prev) => ({ ...prev, sort: val }))}
                className="max-w-[320px] w-full"
                placeholder="Сортировать по:"
                options={OPTIONS}
              />
              <Select
                label="Порядок:"
                value={sort.order}
                onChange={(val) => setSort((prev) => ({ ...prev, order: val }))}
                className="max-w-[320px] w-full"
                placeholder="Порядок"
                options={SORT_OPTIONS}
              />
            </div>

            <Select
              maxTagCount={2}
              label="Показать столбцы:"
              options={allColumns.map((item) => ({
                label: item.title as string,
                value: item.key as string,
              }))}
              value={showedcolumns}
              onChange={(val) => setShowedColumns(val as string[])}
              mode="multiple"
              className="max-w-[320px] w-full"
              placeholder="Показать столбцы"
            />
          </div>

          <div className="flex items-center mt-[30px]">
            <span className="font-medium leading-[100%]">Фильтры</span>{" "}
            <Divider
              type="vertical"
              className="!h-[20px] !border-[rgba(0,0,0,.3)]"
            />
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="!p-0 h-fit underline text-[14px] flex items-center"
            >
              Показать дополнительные фильтры
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-3 gap-2 mt-[20px]">
              <Input
                label="Заголовок"
                value={search.title}
                onChange={(e) => handleFilterChange(e.target.value, "title")}
              />
            </div>
          )}
        </div>

        <Table
          rowSelection={rowSelection}
          rowKey={(rec) => rec.id}
          pagination={{
            current: page,
            total: moduleList.count,
            pageSize: pageSize,
            onShowSizeChange: (_, size) => {
              setPageSize(size);
            },
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`,
            onChange: (value) => setPage(value),
            showQuickJumper: true,
            locale: {
              jump_to: "Перейти на страницу",
              page: "",
            },
          }}
          loading={isPending || isRefetching}
          columns={columns}
          dataSource={moduleList.results}
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
