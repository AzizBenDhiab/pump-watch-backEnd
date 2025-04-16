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
import { CreateFailureDto } from './dto/create-failure.dto';
import { UpdateFailureDto } from './dto/update-failure.dto';
import { FailureService } from './failure.service';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@Controller('failures') // Correct route
export class FailureController {
  constructor(private readonly failureService: FailureService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFailureDto: CreateFailureDto) {
    return this.failureService.create(createFailureDto);
  }

  @Get()
  //@UseGuards(JwtAuthGuard)
  findAll() {
    return this.failureService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.failureService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateFailureDto: UpdateFailureDto) {
    return this.failureService.update(+id, updateFailureDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.failureService.remove(+id);
  }

  // New route to find failures by pumpId
  @Get('by-pump/:pumpId')
  @UseGuards(JwtAuthGuard)
  findByPumpId(@Param('pumpId') pumpId: string) {
    return this.failureService.findByPumpId(+pumpId);
  }
}
