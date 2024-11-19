import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFailureDto } from './dto/create-failure.dto';
import { UpdateFailureDto } from './dto/update-failure.dto';
import { FailureEntity } from './entities/failure.entity';
import { PumpEntity } from 'src/pump/entities/pump.entity';
import { PumpService } from '../pump/pump.service';

@Injectable()
export class FailureService {
  constructor(
    @InjectRepository(FailureEntity)
    private readonly failureRepository: Repository<FailureEntity>,
    private readonly pumpService: PumpService,
  ) {}

  async create(createFailureDto: CreateFailureDto): Promise<FailureEntity> {
    const failure = new FailureEntity();
    failure.Type = createFailureDto.Type;
    failure.pump = await this.pumpService.findOne(createFailureDto.pumpId);
    failure.Date = createFailureDto.Date;
    return await this.failureRepository.save(failure);
  }

  async findAll(): Promise<FailureEntity[]> {
    return await this.failureRepository.find({
      relations: ['pump'], // Including related pump entity
    });
  }

  async findOne(id: number): Promise<FailureEntity> {
    const failure = await this.failureRepository.findOne({
      where: { id },
      relations: ['pump'], // Including related pump entity
    });
    if (!failure) {
      throw new NotFoundException(`Failure with id ${id} not found`);
    }
    return failure;
  }

  async update(
    id: number,
    updateFailureDto: UpdateFailureDto,
  ): Promise<FailureEntity> {
    const failure = await this.failureRepository.preload({
      id,
      ...updateFailureDto,
    });
    if (!failure) {
      throw new NotFoundException(`Failure with id ${id} not found`);
    }
    return await this.failureRepository.save(failure);
  }

  async remove(id: number): Promise<void> {
    const result = await this.failureRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Failure with id ${id} not found`);
    }
  }

  async findByPumpId(pumpId: number): Promise<FailureEntity[]> {
    const failures = await this.failureRepository.find({
      where: { pump: { id: pumpId } },
      relations: ['pump'], // Including related pump entity
    });

    if (!failures || failures.length === 0) {
      throw new NotFoundException(`No failures found for pump ID ${pumpId}`);
    }

    return failures;
  }
}
