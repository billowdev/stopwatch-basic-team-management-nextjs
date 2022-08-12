import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TEAM_REPOSITORY } from 'src/@core/constants';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(@Inject(TEAM_REPOSITORY) private readonly teamRepository: typeof Team) { }

  create(createTeamDto: CreateTeamDto) {
    try {
      return this.teamRepository.create(createTeamDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }
  createBulk(createTeamDto: CreateTeamDto[]) {
    try {
      return this.teamRepository.bulkCreate(createTeamDto)

    } catch (error) {
      throw new BadRequestException()
    }
  }



  findAll() {
    try {
      return this.teamRepository.findAll()

    } catch (error) {
      throw new BadRequestException()
    }
  }

  findOne(id: string) {
    try {
      return this.teamRepository.findByPk(id)

    } catch (error) {
      throw new BadRequestException()
    }
  }

  update(id: string, updateTeamDto: UpdateTeamDto) {
    try {
      return this.teamRepository.update({ ...updateTeamDto }, { where: { id } })
    } catch (error) {
      throw new BadRequestException()
    }
  }

  remove(id: string) {
    try {
      return this.teamRepository.destroy({ where: { id } })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
