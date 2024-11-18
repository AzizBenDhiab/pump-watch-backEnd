import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { MessageEntity } from '../../message/entities/message.entity';
import { TimestampEntity } from 'src/generics/timestamp.entity';

@Entity('conversation')
export class ConversationEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  user: UserEntity;

  @OneToMany(() => MessageEntity, (message) => message.conversation, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  messages: MessageEntity[];
}
