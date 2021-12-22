export interface Session {
  id: string;
}

export interface AuthForm {
  login: string
  password: string
  remember: boolean
}