import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
import { UserEntity } from './user/entities/user.entity';
import { TimestampEntity } from './generics/timestamp.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversationModule } from './conversation/conversation.module';
import { ConversationEntity } from './conversation/entities/conversation.entity';
import { MessageEntity } from './message/entities/message.entity';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { CompanyEntity } from './company/entities/company.entity';
import { PumpEntity } from './pump/entities/pump.entity';
import { FailureEntity } from './failure/entities/failure.entity';
import { JwtService } from '@nestjs/jwt';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UserEntity,
        CompanyEntity,
        PumpEntity,
        MessageEntity,
        ConversationEntity,
        FailureEntity,
      ],
      synchronize: true,
    }),
    UserModule,
    MessageModule,
    ConversationModule,
    CompanyEntity,
    PumpEntity,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
