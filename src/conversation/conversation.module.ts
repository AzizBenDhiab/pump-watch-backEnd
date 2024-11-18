import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './entities/conversation.entity';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';
@Module({
  imports: [
    forwardRef(() => MessageModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([ConversationEntity]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConversationModule {}
