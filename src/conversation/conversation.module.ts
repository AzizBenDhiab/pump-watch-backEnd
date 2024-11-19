import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './entities/conversation.entity';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
@Module({
  imports: [
    forwardRef(() => MessageModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([ConversationEntity]),
  ],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
