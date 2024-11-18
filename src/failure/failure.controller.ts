import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFailureDto } from './dto/create-failure.dto';
import { UpdateFailureDto } from './dto/update-failure.dto';
import { FailureService } from './failure.service';

@Controller('failures') // Correct route
export class FailureController {
  constructor(private readonly failureService: FailureService) {}

  @Post()
  create(@Body() createFailureDto: CreateFailureDto) {
    return this.failureService.create(createFailureDto);
  }

  @Get()
  findAll() {
    return this.failureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.failureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFailureDto: UpdateFailureDto) {
    return this.failureService.update(+id, updateFailureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.failureService.remove(+id);
  }

  // New route to find failures by pumpId
  @Get('by-pump/:pumpId')
  findByPumpId(@Param('pumpId') pumpId: string) {
    return this.failureService.findByPumpId(+pumpId);
  }
}
