import { AxiosError } from "axios";
import {
  ModuleDetails,
  ModuleList,
  ModulePayload,
  ModuleSortType,
} from "module/types/ModuleType";
import "reflect-metadata";
import { PrivateApi } from "shared/lib/api/PrivateApi";
import ErrorMessages from "shared/lib/consts/errors";
import { OrderingType } from "shared/lib/types/OrderingType";
import { ResponseType, StatusType } from "shared/lib/types/StatusType";
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
    search?: string;
  }): Promise<ResponseType<ModuleList>> {
    try {
      // Собираем параметры запроса только если они заданы
      const params: string[] = [];

      if (options.page !== undefined) {
        params.push(`page=${options.page}`);
      }

      if (options.sort?.sort !== undefined) {
        params.push(`sort=${options.sort.sort}`);
      }

      if (options.sort?.order !== undefined) {
        params.push(`order=${options.sort.order}`);
      }

      if (options.search) {
        // Кодирование строки поиска для корректной передачи в URL
        params.push(`search=${encodeURIComponent(options.search)}`);
      }

      // Формируем итоговую строку запроса (если есть параметры)
      const queryString = params.length ? `?${params.join("&")}` : "";

      // Пример запроса (раскомментируйте и адаптируйте по необходимости)
      // const res = await this.get(`module/${queryString}`);

      return {
        status: StatusType.SUCCESS,
        data: {
          count: 1,
          results: [
            { id: "unique-id-1", title: "Example Title 1" },
            { id: "unique-id-2", title: "Example Title 2" },
            { id: "unique-id-3", title: "Example Title 3" },
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
