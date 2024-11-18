import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePumpDto } from './dto/create-pump.dto';
import { PumpService } from './pump.service';

@Controller('pumps')
export class PumpController {
  constructor(private readonly pumpService: PumpService) {}

  @Post()
  create(@Body() createPumpDto: CreatePumpDto) {
    return this.pumpService.create(createPumpDto);
  }

  @Get()
  findAll() {
    return this.pumpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pumpService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pumpService.remove(+id);
  }
}
