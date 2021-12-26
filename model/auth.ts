import request from '@flcn-ecomm/lib/helper/request'


export interface LoginResponse {
  firstName: string | null,
  lastName: string | null,
  capabilities: string[],
  token: string,
  expires: number,
}

export interface ErrorResponse {
  error: string,
}

export default class Auth {
  public static async login(login: string, password: string, remember: boolean): Promise<LoginResponse | ErrorResponse> {
    try {
      const response = await request.post('auth/login', { login,  password, remember });

      return response.data;
    } catch (error) { return { error: 'Internal Server Error!' }; }
  }
}