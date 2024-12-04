import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InvoicesModule } from './invoices/invoices.module'
import { PrismaService } from './prisma.service'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { AuthMiddleware } from './auth/auth.middleware'
import { AuthService } from './auth/auth.service'

@Module({
  imports: [InvoicesModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'invoices',
      method: RequestMethod.ALL
    })
  }
}
