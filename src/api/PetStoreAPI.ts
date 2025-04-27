import { APIRequestContext } from '@playwright/test';
import { PETSTORE_BASE_URL, PETSTORE_PETSTATUS, PETSTORE_USERQUERY } from '../constants';

export class PetStoreAPI {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(user: any) {
    const response = await this.request.post(`${PETSTORE_BASE_URL}${PETSTORE_USERQUERY}`, { data: user });
    return response;
  }

  async getUser(username: string) {
    const response = await this.request.get(`${PETSTORE_BASE_URL}${PETSTORE_USERQUERY}${username}`);
    return response;
  }

  async findSoldPets() {
    const response = await this.request.get(`${PETSTORE_BASE_URL}${PETSTORE_PETSTATUS}`);
    return response;
  }
}