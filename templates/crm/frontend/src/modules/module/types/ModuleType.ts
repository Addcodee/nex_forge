import { ListType } from "shared/lib/types";

export interface ModuleList extends ListType {
  results: ModuleItem[];
}

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
}

export interface ModuleDetails {
  id: string;
  title: string;
}

export interface ModulePayload {
  title: string;
}

export enum ModuleSortType {
  CREATED_AT = "created_at",
  TITLE = "title",
}

export type ModuleSearchType = {
  title: string;
};
