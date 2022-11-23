
import { Request, Response, Router, NextFunction } from 'express'
import userRoutes from './user.routes'
import userSessionRoutes from './userSession.routes'
import companyRoutes from './company.routes'
import stockRoutes from './stock.routes'
import { Exception } from '../../../../domain/exceptions/Exception'

const route = Router()

route.use('/v1/users', userRoutes)
route.use('/v1/user-session', userSessionRoutes)
route.use('/v1/companies', companyRoutes)
route.use('/v1/stocks', stockRoutes)

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    res.status(400).json({
      message: err.spanishMessage
    })
  } else {
    next(err)
  }
})

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500)
  res.json({
    error: err
  })
})

export default route
