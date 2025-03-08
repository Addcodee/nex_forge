import { Table as AntTable, TableProps } from "antd";

export interface MyTableProps<RecordType extends object = any>
  extends TableProps<RecordType> {
  customProp?: string;
}

function Table<RecordType extends object = any>(
  props: MyTableProps<RecordType>
) {
  return <AntTable {...props} />;
}

export default Table;
