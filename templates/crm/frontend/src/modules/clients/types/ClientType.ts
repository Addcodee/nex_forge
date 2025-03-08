import { ListType } from "shared/lib/types/ListType";

export interface ClientList extends ListType {
  results: ClientItem;
}

export interface ClientItem {
  id: string;
  full_name: string;
  phone_number: string;
  is_active: boolean;
}

export interface ClientDetails {
  id: string;
  full_name: string;
  phone_number: string;
  is_active: boolean;

  paying_date: string;
  billing_number: number;
}

export interface ClientPayload {
  full_name: string;
  phone_number: string;
  is_active: boolean;
  paying_date: string;
}
