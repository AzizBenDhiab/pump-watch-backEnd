import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PumpEntity } from './entities/pump.entity';
import { CreatePumpDto } from './dto/create-pump.dto';

@Injectable()
export class PumpService {
  constructor(
    @InjectRepository(PumpEntity)
    private readonly pumpRepository: Repository<PumpEntity>,
  ) {}

  async create(createPumpDto: CreatePumpDto): Promise<PumpEntity> {
    const pump = this.pumpRepository.create(createPumpDto);
    return await this.pumpRepository.save(pump);
  }

  async findAll(): Promise<PumpEntity[]> {
    return await this.pumpRepository.find();
  }

  async findOne(id: number): Promise<PumpEntity> {
    const pump = await this.pumpRepository.findOne({ where: { id } });
    if (!pump) {
      throw new NotFoundException(`Pump with ID ${id} not found`);
    }
    return pump;
  }

  async remove(id: number): Promise<void> {
    const pump = await this.findOne(id); // Ensure the pump exists
    await this.pumpRepository.remove(pump);
  }
}
