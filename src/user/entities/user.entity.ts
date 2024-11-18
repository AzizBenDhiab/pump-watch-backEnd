import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';

@Entity('user')
export class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  lastName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    nullable: false,
  })
  salt: string;

  @ManyToOne(() => CompanyEntity, { eager: true, nullable: false })
  company: CompanyEntity;
}
