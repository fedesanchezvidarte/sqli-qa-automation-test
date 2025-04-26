import { APIRequestContext } from '@playwright/test';
import { PETSTORE_BASE_URL } from '../constants';

export class PetStoreAPI {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(user: any) {
    const response = await this.request.post(`${PETSTORE_BASE_URL}/user`, { data: user });
    return response;
  }

  async getUser(username: string) {
    const response = await this.request.get(`${PETSTORE_BASE_URL}/user/${username}`);
    return response;
  }

  async findSoldPets() {
    const response = await this.request.get(`${PETSTORE_BASE_URL}/pet/findByStatus?status=sold`);
    return response;
  }
}