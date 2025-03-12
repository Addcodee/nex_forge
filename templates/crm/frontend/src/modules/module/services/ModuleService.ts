import { AxiosError } from "axios";
import {
  ModuleDetails,
  ModuleList,
  ModulePayload,
  ModuleSortType,
} from "module/types/ModuleType";
import "reflect-metadata";
import { BaseApi } from "shared/lib/api/BaseApi";
import ErrorMessages from "shared/lib/consts/errors";
import { OrderType } from "shared/lib/types/OrderingType";
import { ResponseType, StatusType } from "shared/lib/types/StatusType";
import { container } from "tsyringe";

export class ModuleService extends BaseApi {
  constructor() {
    super();
  }

  async getAll(
    page: number,
    sort: {
      sort: ModuleSortType;
      order: OrderType;
    },
    search: string
  ): Promise<ResponseType<ModuleList>> {
    try {
      console.log(page, sort, search);
      // const res = await this.get(`module/?page=${page}&sort=${sort.sort}&order={sort.order}&search=${search}`);

      return {
        status: StatusType.SUCCESS,
        data: {
          count: 1,
          results: [{ id: "unique-id", title: "Example Title" }],
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
