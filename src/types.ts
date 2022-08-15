import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'

export interface MyToken extends JwtPayload {
  email: string
  exp: number
}

export interface AuthenticatedRequest extends Request {
  email: string
}
export interface userInfo extends Request {
    firstname: string

    lastname: string

    email: string


    password: string

 }