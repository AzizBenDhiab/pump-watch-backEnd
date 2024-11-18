import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<CompanyEntity[]> {
    return await this.companyRepository.find({
      relations: ['users', 'pumps'], // Including related entities
    });
  }

  async findOne(id: number): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['users', 'pumps'], // Including related entities
    });
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
    return company;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyEntity> {
    const company = await this.companyRepository.preload({
      id,
      ...updateCompanyDto,
    });
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
    return await this.companyRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    const result = await this.companyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
  }

  // Custom method to find company by pump ID
  async findByPumpId(pumpId: number): Promise<CompanyEntity> {
    const company = await this.companyRepository
      .createQueryBuilder('company')
      .innerJoinAndSelect('company.pumps', 'pump', 'pump.id = :pumpId', { pumpId })
      .getOne();

    if (!company) {
      throw new NotFoundException(`No company found for pump ID ${pumpId}`);
    }

    return company;
  }
}
