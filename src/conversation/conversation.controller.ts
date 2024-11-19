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
import { ConversationService } from './conversation.service';
import { UserEntity } from '../user/entities/user.entity';
import { User } from 'src/decorators/user.decorator';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createConversationDto: CreateConversationDto,
    @User() user: UserEntity,
  ) {
    return this.conversationService.create(createConversationDto, user);
  }
  @Get('/user')
  @UseGuards(JwtAuthGuard)
  findUserConversations(@User() user) {
    console.log(user.id);
    return this.conversationService.getConversationsOfOneUser(+user.id);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.conversationService.findOne(+id);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.conversationService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  softDelete(@Param('id') id: string) {
    return this.conversationService.softDelete(+id);
  }
}
