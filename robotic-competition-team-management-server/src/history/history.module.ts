import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { historyProviders } from './entities/history.providers';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, ...historyProviders]
})
export class HistoryModule {}
