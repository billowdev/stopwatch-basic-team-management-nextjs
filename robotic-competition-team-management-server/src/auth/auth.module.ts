import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy, LocalStrategy } from './strategies';
import * as dotenv from 'dotenv';
import { RolesGuard } from './guards/roles.guard';
dotenv.config();

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAuthStrategy,
    RolesGuard
  ],
  controllers: [AuthController]
})
export class AuthModule { }
