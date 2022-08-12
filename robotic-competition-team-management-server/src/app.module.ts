import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { HistoryModule } from './history/history.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    HistoryModule,
    TeamModule,
    AuthModule,
  ],
})
export class AppModule {}
