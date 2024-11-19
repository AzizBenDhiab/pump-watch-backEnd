import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async findByPumpId(@Param('pumpId') pumpId: number) {
    return this.comapnyService.findByPumpId(pumpId);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.comapnyService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateComapnyDto: UpdateCompanyDto) {
    return this.comapnyService.update(+id, updateComapnyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.comapnyService.remove(+id);
  }
}
