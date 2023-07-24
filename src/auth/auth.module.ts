import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY || "12345678",
      signOptions: { expiresIn: '15m' },
    }),
    forwardRef(()=> UsersModule),
  ],
  exports: [
      JwtModule,
      AuthService
  ]
})
export class AuthModule {}
