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
import { CreatePumpDto } from './dto/create-pump.dto';
import { PumpService } from './pump.service';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@Controller('pumps')
export class PumpController {
  constructor(private readonly pumpService: PumpService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPumpDto: CreatePumpDto) {
    return this.pumpService.create(createPumpDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.pumpService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.pumpService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.pumpService.remove(+id);
  }
}
