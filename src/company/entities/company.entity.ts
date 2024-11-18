import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PumpEntity } from 'src/pump/entities/pump.entity';

@Entity('company')
export class CompanyEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  Name: string;

  @OneToMany(() => UserEntity, (user) => user.company, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  users: UserEntity[];

  @OneToMany(() => PumpEntity, (pump) => pump.company, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  pumps: PumpEntity[];
}
