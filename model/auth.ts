import request from '@flcn-ecomm/lib/helper/request'


export default class Auth {
  public static login(login: string, password: string, remember: boolean) {
    return request.post('auth/login', {
      login,
      password,
      remember
    })
  }
}