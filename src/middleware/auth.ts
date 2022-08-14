import jwt from 'jsonwebtoken'
import { AuthRequest, MyToken } from '../types'

export const isAuthenticated = async (req: AuthRequest, res, next) => {    const { authorization } = req.headers
    if(!authorization){
        return res.status(403).send(" A token is requried for authentication");
    
    }
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