import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { CompanyEntity } from './entities/company.entity';
import { PumpModule } from 'src/pump/pump.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => PumpModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CompanyModule {}
