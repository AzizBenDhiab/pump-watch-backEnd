import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PumpController } from './pump.controller';
import { PumpService } from './pump.service';
import { CompanyModule } from 'src/company/company.module';
import { FailureModule } from 'src/failure/failure.module';
import { PumpEntity } from './entities/pump.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PumpEntity]),
    forwardRef(() => CompanyModule),
    forwardRef(() => FailureModule),
  ],
  controllers: [PumpController],
  providers: [PumpService],
  exports: [PumpService],
})
export class PumpModule {}
