import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PumpEntity } from './entities/pump.entity';
import { CreatePumpDto } from './dto/create-pump.dto';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class PumpService {
  constructor(
    @InjectRepository(PumpEntity)
    private readonly pumpRepository: Repository<PumpEntity>,
    private companyService: CompanyService,
  ) {}

  async create(createPumpDto: CreatePumpDto): Promise<PumpEntity> {
    const pump = new PumpEntity();
    pump.Name = createPumpDto.Name;
    pump.company = await this.companyService.findOne(createPumpDto.companyId);
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
