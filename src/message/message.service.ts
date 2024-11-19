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
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => ConversationService))
    private readonly conversationService: ConversationService,
    private readonly httpService: HttpService,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    senderId: number,
  ): Promise<MessageEntity[]> {
    // Create user message
    const userMessage = new MessageEntity();
    userMessage.text = createMessageDto.text;
    userMessage.user = await this.userService.findOne(senderId);
    userMessage.conversation = await this.conversationService.findOne(
      createMessageDto.conversationId,
    );

    const savedUserMessage = await this.messageRepository.save(userMessage);

    // Send request to chatbot
    const chatbotResponse = await lastValueFrom(
      this.httpService.post(
        'http://127.0.0.1:5000/chatbot',
        {
          query: createMessageDto.text, // Updated body structure
        },
        {
          headers: {
            'Content-Type': 'application/json', // Header for JSON content type
          },
        },
      ),
    );

    // Create bot message
    const botMessage = new MessageEntity();
    botMessage.text = chatbotResponse.data?.responseText || 'Default bot reply';
    botMessage.user = await this.userService.findOne(2);
    botMessage.conversation = userMessage.conversation;

    const savedBotMessage = await this.messageRepository.save(botMessage);

    // Return both messages
    return [savedUserMessage, savedBotMessage];
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
