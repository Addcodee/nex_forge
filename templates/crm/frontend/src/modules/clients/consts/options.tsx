import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from "react-icons/tb";

export const OPTIONS = [
  { value: "1", label: "Дате создания" },
  { value: "2", label: "ФИО" },
];

export const SORT_OPTIONS = [
  {
    value: "asc",
    label: (
      <div className="flex items-center gap-2">
        <TbSortAscendingLetters />
        По возрастанию
      </div>
    ),
  },
  {
    value: "desc",
    label: (
      <div className="flex items-center gap-2">
        <TbSortDescendingLetters />
        По убыванию
      </div>
    ),
  },
];
