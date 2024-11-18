import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly comapnyService: CompanyService) {}

  @Post()
  create(@Body() createComapnyDto: CreateCompanyDto) {
    return this.comapnyService.create(createComapnyDto);
  }

  @Get()
  findAll() {
    return this.comapnyService.findAll();
  }

  @Get('by-pump/:pumpId')
  async findByPumpId(@Param('pumpId') pumpId: number) {
    return this.comapnyService.findByPumpId(pumpId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comapnyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComapnyDto: UpdateCompanyDto) {
    return this.comapnyService.update(+id, updateComapnyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comapnyService.remove(+id);
  }
}
