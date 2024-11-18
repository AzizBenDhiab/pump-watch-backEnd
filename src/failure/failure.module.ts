import { FailureService } from './failure.service';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PumpModule } from 'src/pump/pump.module';
import { FailureEntity } from './entities/failure.entity';
import { FailureController } from './failure.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FailureEntity]),
    forwardRef(() => PumpModule),
  ],
  controllers: [FailureController,],
  providers: [FailureService, ],
  exports: [],
})
export class FailureModule { }
