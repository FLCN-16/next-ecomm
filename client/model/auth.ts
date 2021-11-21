import request from '@flcn-ecomm/lib/helper/request'


export class Auth {
  login(email: string, password: string, remember: boolean) {
    return request.post('/auth/login', {
      email,
      password,
      remember
    })
  }
}