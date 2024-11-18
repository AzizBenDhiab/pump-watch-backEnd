import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Req,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Param,
  Patch,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { LoginCredentialsDto } from './dto/LoginCredentials.dto';
import { Response } from 'express';
import { User } from 'src/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/auth')
  async finduser(@User() user): Promise<UserEntity> {
    return this.userService.findOne(user.id);
  }

  @Post('register')
  async register(
    @Body() userData: UserSubscribeDto,
    @Req() request: Request,
  ): Promise<Partial<UserEntity>> {
    return this.userService.register(userData);
  }

  @Post('login')
  login(@Body() credentials: LoginCredentialsDto, @Res() response: Response) {
    return this.userService.login(credentials, response);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    return this.userService.update(+id, userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(+id);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
