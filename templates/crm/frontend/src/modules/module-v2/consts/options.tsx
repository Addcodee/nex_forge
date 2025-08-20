import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from "react-icons/tb";

export const OPTIONS = [
  { value: "created_at", label: "Дате создания" },
  { value: "title", label: "Заголовок" },
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
