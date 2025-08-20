import { AxiosError } from "axios";
import {
  ModuleDetails,
  ModuleList,
  ModulePayload,
  ModuleSearchType,
  ModuleSortType,
} from "module/types";
import "reflect-metadata";
import { PrivateApi } from "shared/lib/api";
import { ErrorMessages } from "shared/lib/consts";
import { OrderingType } from "shared/lib/types";
import { ResponseType, StatusType } from "shared/lib/types";
import { container } from "tsyringe";

export class ModuleService extends PrivateApi {
  constructor() {
    super();
  }

  async getAll(options: {
    page?: number;
    sort?: {
      sort: ModuleSortType;
      order: OrderingType;
    };
    search?: ModuleSearchType;
    pageSize?: number;
  }): Promise<ResponseType<ModuleList>> {
    try {
      // Собираем параметры запроса только если они заданы
      const params: string[] = [];

      if (options.page !== undefined) {
        params.push(`page=${options.page}`);
      }

      if (options.sort?.order !== undefined) {
        params.push(
          `order_by=${options.sort.order === OrderingType.ASC ? "" : "-"}${
            options.sort.sort
          }`
        );
      }

      if (options.search) {
        // Кодирование строки поиска для корректной передачи в URL
        const searchFields = Object.entries(options.search)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&");
        params.push(searchFields);
      }

      if (options.pageSize !== undefined) {
        params.push(`size=${options.pageSize}`);
      }

      // Формируем итоговую строку запроса (если есть параметры)
      const queryString = params.length ? `?${params.join("&")}` : "";

      // Пример запроса (раскомментируйте и адаптируйте по необходимости)
      // const res = await this.get(`module/${queryString}`);

      return {
        status: StatusType.SUCCESS,
        data: {
          count: 22,
          results: [
            {
              id: "unique-id-1",
              title: "Example Title 1",
              description: "Example Description 1",
            },
            {
              id: "unique-id-2",
              title: "Example Title 2",
              description: "Example Description 1",
            },
            {
              id: "unique-id-3",
              title: "Example Title 3",
              description: "Example Description 1",
            },
            {
              id: "unique-id-4",
              title: "Example Title 4",
              description: "Example Description 1",
            },
          ],
        },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          status: StatusType.ERROR,
          error: ErrorMessages.ServerError,
        };
      }

      return {
        status: StatusType.ERROR,
        error: ErrorMessages.UnexpectedError,
      };
    }
  }

  async getById(id: string): Promise<ResponseType<ModuleDetails>> {
    try {
      // const res = await this.get(`module/${id}/`);

      return {
        status: StatusType.SUCCESS,
        data: { id: id, title: "Example Title" },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          status: StatusType.ERROR,
          error: ErrorMessages.ServerError,
        };
      }

      return {
        status: StatusType.ERROR,
        error: ErrorMessages.UnexpectedError,
      };
    }
  }

  async create(
    payload: ModulePayload
  ): Promise<ResponseType<{ success: boolean }>> {
    try {
      await this.post("module/", payload);

      return {
        status: StatusType.SUCCESS,
        data: { success: true },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          status: StatusType.ERROR,
          error: `${ErrorMessages.ServerError} ${error.status}`,
        };
      }

      return {
        status: StatusType.ERROR,
        error: ErrorMessages.UnexpectedError,
      };
    }
  }

  async update(
    id: string,
    payload: ModulePayload
  ): Promise<ResponseType<{ success: boolean }>> {
    try {
      await this.patch(`module/${id}/`, payload);

      return {
        status: StatusType.SUCCESS,
        data: { success: true },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          status: StatusType.ERROR,
          error: `${ErrorMessages.ServerError} ${error.status}`,
        };
      }

      return {
        status: StatusType.ERROR,
        error: ErrorMessages.UnexpectedError,
      };
    }
  }

  async remove(id: string): Promise<ResponseType<ModuleDetails>> {
    try {
      const res = await this.delete(`module/${id}/`);

      return {
        status: StatusType.SUCCESS,
        data: res.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          status: StatusType.ERROR,
          error: `${ErrorMessages.ServerError} ${error.status}`,
        };
      }

      return {
        status: StatusType.ERROR,
        error: ErrorMessages.UnexpectedError,
      };
    }
  }
}

export const moduleService = container.resolve(ModuleService);
