import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ConversationService } from 'src/conversation/conversation.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => ConversationService))
    private readonly conversationService: ConversationService,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    senderId: number,
  ): Promise<MessageEntity> {
    const message = new MessageEntity();
    message.text = createMessageDto.text;
    message.user = await this.userService.findOne(senderId);
    message.conversation = await this.conversationService.findOne(
      createMessageDto.conversationId,
    );

    return this.messageRepository.save(message);
  }

  async findAll(): Promise<MessageEntity[]> {
    return await this.messageRepository.find();
  }

  async findOne(id: number): Promise<MessageEntity> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`message with id ${id} not found`);
    }
    return message;
  }

  async softDelete(id: number): Promise<void> {
    const message = await this.findOne(+id);
    await this.messageRepository.softDelete(id);
  }

  async getMessagesByConversationId(id: number): Promise<MessageEntity[]> {
    const messages = await this.messageRepository.find({
      relations: {
        conversation: true,
      },
      where: {
        conversation: {
          id: id,
        },
      },
    });
    return await messages;
  }
}
