import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { HISTORY_REPOSITORY } from 'src/@core/constants';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(@Inject(HISTORY_REPOSITORY) private readonly historyRepository: typeof History) { }

  create(createHistoryDto: CreateHistoryDto) {
    try {
      return this.historyRepository.create(createHistoryDto)

    } catch (error) {
      throw new BadRequestException()
    }
  }
  createBulk(createHistoryDto: CreateHistoryDto[]) {
    try {
      return this.historyRepository.bulkCreate(createHistoryDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }



  findAll() {
    try {
      return this.historyRepository.findAll()

    } catch (error) {
      throw new BadRequestException()
    }
  }

  findOne(id: string) {
    try {
      return this.historyRepository.findByPk(id)

    } catch (error) {
      throw new BadRequestException()
    }
  }

  update(id: string, updateHistoryDto: UpdateHistoryDto) {
    try {
      return this.historyRepository.update({ ...updateHistoryDto }, { where: { id } })
    } catch (error) {
      throw new BadRequestException()
    }
  }

  remove(id: string) {
    try {
      return this.historyRepository.destroy({ where: { id } })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
