import request from '@flcn-ecomm/lib/helper/request'
import graphql, { gql } from '@flcn-ecomm/lib/graphql'


export interface LoginResponse {
  firstName: string | null,
  lastName: string | null,
  capabilities: string[],
  token: string,
  expires: number,
  expiresOn?: number
}

export default class Auth {
  public static async login(login: string, password: string, remember: boolean): Promise<LoginResponse> {
    try {
      const response = await request.post('auth/login', { login,  password, remember });

      return response.data;
    } catch (error) { throw new Error('Internal Server Error!') }
  }

  public static async account(token: String) {
    const query = gql`
      query Me($token: String!) {
        me(token: $token) {
          ID
          firstName
          lastName
          username
          email
          role
          verified
          capabilities { slug }
        }
      }
    `

    return await graphql.query({ query, variables: { token } })
  }
}