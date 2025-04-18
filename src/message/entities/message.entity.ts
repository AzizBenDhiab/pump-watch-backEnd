import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ConversationEntity } from '../../conversation/entities/conversation.entity';
import { TimestampEntity } from 'src/generics/timestamp.entity';

@Entity('message')
export class MessageEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', eager: true })
  user: UserEntity;

  @ManyToOne(
    () => ConversationEntity,
    (conversation) => conversation.messages,
    { onDelete: 'CASCADE', eager: true, nullable: false },
  )
  conversation: ConversationEntity;

  @Column()
  @Column({ type: 'text' })
  text: string;
}
