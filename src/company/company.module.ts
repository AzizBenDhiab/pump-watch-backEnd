import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PumpModule } from 'src/pump/pump.module';
import { UserModule } from '../user/user.module';
import { CompanyController } from './company.controller';
import { CompanyEntity } from './entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => PumpModule),
  ],
  controllers: [CompanyController,],
  providers: [],
  exports: [],
})
export class CompanyModule { }
