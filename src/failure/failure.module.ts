import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FailureEntity } from './entities/failure.entity';
import { PumpModule } from 'src/pump/pump.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FailureEntity]),
    forwardRef(() => PumpModule),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class FailureModule {}
