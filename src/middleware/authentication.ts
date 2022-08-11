import jwt from 'jsonwebtoken'
import User  from '../entities/User'
import { AuthRequest, MyToken } from '../types'

export const isAuthenticated = async (req: AuthRequest, res, next) => {
    const { authorization } = req.headers
  
    jwt.verify(
      authorization,
      process.env.TOKEN_KEY!,
      async (err, token: MyToken) => {
        if (err) {
          return res.status(401).json({
            message: 'Invalid token',
          })
        }
        req.email = token.email
        next()
  
      }
    )
  }