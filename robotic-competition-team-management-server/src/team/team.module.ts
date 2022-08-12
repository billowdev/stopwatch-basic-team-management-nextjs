import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { teamProviders } from './entities/team.providers';

@Module({
  controllers: [TeamController],
  providers: [TeamService, ...teamProviders]
})
export class TeamModule { }
