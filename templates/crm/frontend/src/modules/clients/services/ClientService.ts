import { AxiosError } from "axios";
import {
  ClientDetails,
  ClientList,
  ClientPayload,
} from "clients/types/ClientType";
import "reflect-metadata";
import { BaseApi } from "shared/lib/api/BaseApi";
import ErrorMessages from "shared/lib/consts/errors";
import { ResponseType, StatusType } from "shared/lib/types/StatusType";
import { container } from "tsyringe";

export class ClientService extends BaseApi {
  constructor() {
    super();
  }

  async getAll(): Promise<ResponseType<ClientList>> {
    try {
      const res = await this.get("clients/");

      return {
        status: StatusType.SUCCESS,
        data: res.data,
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

  async getById(id: string): Promise<ResponseType<ClientDetails>> {
    try {
      const res = await this.get(`clients/${id}/`);

      return {
        status: StatusType.SUCCESS,
        data: res.data,
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
    payload: ClientPayload
  ): Promise<ResponseType<{ success: boolean }>> {
    try {
      await this.post("clients/", payload);

      return {
        status: StatusType.SUCCESS,
        data: { success: true },
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

  async update(
    id: string,
    payload: ClientPayload
  ): Promise<ResponseType<{ success: boolean }>> {
    try {
      await this.patch(`clients/${id}/`, payload);

      return {
        status: StatusType.SUCCESS,
        data: { success: true },
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

  async remove(id: string): Promise<ResponseType<ClientDetails>> {
    try {
      const res = await this.delete(`clients/${id}/`);

      return {
        status: StatusType.SUCCESS,
        data: res.data,
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
}

export const clientService = container.resolve(ClientService);
