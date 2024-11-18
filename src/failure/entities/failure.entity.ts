import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { PumpEntity } from 'src/pump/entities/pump.entity';

@Entity('failure')
export class FailureEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  Type: string;

  @ManyToOne(() => PumpEntity, { eager: true, nullable: false })
  pump: PumpEntity;
}
