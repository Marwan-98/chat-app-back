import jwt from 'jsonwebtoken'

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({
        message: 'No token provided',
      })
    }
   
    jwt.verify(token, process.env.TOKEN_KEY!, (err, token) => {
      if (err) {
        return res.status(401).json({
          message: 'Invalid token',
        })
      }
      // check if token is expired
      if (token.exp < Date.now() / 1000) {
        return res.status(401).json({
          message: 'Token expired',
        })
      }

      req.email = token.email
      next()
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
    })
  }
}