import { Module } from '@nestjs/common';
import { TrendController } from './controllers/trend.controller';
import { TrendService } from './services/trend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrendRepository } from './repository/trend.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrendRepository])
  ],
  controllers: [TrendController],
  providers: [TrendService]
})
export class TrendModule {}
