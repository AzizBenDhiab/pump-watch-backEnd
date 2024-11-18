import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { FailureEntity } from 'src/failure/entities/failure.entity';

@Entity('pump')
export class PumpEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  Name: string;

  @ManyToOne(() => CompanyEntity, { eager: true, nullable: false })
  company: CompanyEntity;

  @OneToMany(() => FailureEntity, (failure) => failure.pump, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  failures: FailureEntity[];
}
