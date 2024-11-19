import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ConversationEntity } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { MessageService } from '../message/message.service';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
  ) {}

  async findOne(id: number): Promise<ConversationEntity> {
    const conv = await this.conversationRepository.findOne({ where: { id } });
    if (!conv) {
      throw new NotFoundException(`conversation with id ${id} not found`);
    }
    return conv;
  }
  async create(
    createConversationDto: CreateConversationDto,
    user: UserEntity,
  ): Promise<ConversationEntity> {
    console.log(user);

    const conversation = new ConversationEntity();
    conversation.user = user;
    conversation.title = createConversationDto.title;
    return this.conversationRepository.save(conversation);
  }

  async findAll(): Promise<ConversationEntity[]> {
    return await this.conversationRepository.find();
  }

  async softDelete(id: number): Promise<void> {
    const conv = await this.findOne(+id);
    const messagesAssociated =
      await this.messageService.getMessagesByConversationId(+id);
    for (const message of messagesAssociated) {
      await this.messageService.softDelete(message.id);
    }
    await this.conversationRepository.softDelete(id);
  }

  async getConversationsOfOneUser(
    userId: number,
  ): Promise<ConversationEntity[]> {
    return await this.conversationRepository.find({
      where: [{ user: { id: userId } }],
    });
  }
}
