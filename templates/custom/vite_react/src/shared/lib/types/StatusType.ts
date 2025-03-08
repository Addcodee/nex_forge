export interface SuccessReturnType<T = unknown> {
  status: StatusType.SUCCESS;
  data: T;
}

export interface ErrorReturnType {
  status: StatusType.ERROR;
  error: string;
}

export type StatusReturnType<T = unknown> =
  | SuccessReturnType<T>
  | ErrorReturnType;

export enum StatusType {
  SUCCESS = "success",
  ERROR = "error",
}
