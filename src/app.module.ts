import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './user/entities/user.entity';
import { CompanyEntity } from './company/entities/company.entity';
import { PumpEntity } from './pump/entities/pump.entity';
import { MessageEntity } from './message/entities/message.entity';
import { ConversationEntity } from './conversation/entities/conversation.entity';
import { FailureEntity } from './failure/entities/failure.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { PumpModule } from './pump/pump.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { FailureModule } from './failure/failure.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads env variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
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
    }),
    UserModule,
    CompanyModule,
    PumpModule,
    MessageModule,
    ConversationModule,
    FailureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
