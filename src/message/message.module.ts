import { Module, forwardRef } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => ConversationModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class MessageModule {}
