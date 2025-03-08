export interface SuccessType<T = unknown> {
  status: StatusType.SUCCESS;
  data: T;
}

export interface ErrorType {
  status: StatusType.ERROR;
  error: string;
}

export type ResponseType<T = unknown> = SuccessType<T> | ErrorType;

export enum StatusType {
  SUCCESS = "success",
  ERROR = "error",
}
