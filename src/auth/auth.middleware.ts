import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { AuthService } from './auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      try {
        const isValid = await this.authService.validateToken(token)
        console.log(isValid)
        if (isValid) {
          next()
        } else {
          res.status(401).send('Unauthorized')
        }
      } catch (error) {
        res.status(401).send('Unauthorized')
      }
    } else {
      res.status(401).send('Unauthorized')
    }
  }
}
