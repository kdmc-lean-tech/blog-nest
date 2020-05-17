import { EntityRepository, Repository } from 'typeorm';
import { Trend } from '../../../models/trend.entity';
import { CreateTrendDto } from '../../../dtos/create-trend.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { ActiveEntityDto } from '../../../dtos/active-entity.dto';

@EntityRepository(Trend)
export class TrendRepository extends Repository<Trend> {

  public async getTrends(): Promise<Trend[]> {
    const query = this.createQueryBuilder();
    return query.getMany();
  }

  public async createTrend(createTrendDto: CreateTrendDto): Promise<Trend> {
    const { name } = createTrendDto;
    const trend = new Trend();
    trend.name = name;
    trend.active = true;
    trend.createdAt = new Date();
    trend.updatedAt = new Date();
    try {
      await trend.save();
      return trend;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async updateTrendByEntity(createTrendDto: CreateTrendDto, trend: Trend): Promise<Trend> {
    const { name } = createTrendDto;
    trend.name = name;
    trend.updatedAt = new Date();
    try {
      await trend.save();
      return trend;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async changeStatusTrendByEntity(trend: Trend, activeEntityDto: ActiveEntityDto): Promise<Trend> {
    const { active } = activeEntityDto;
    trend.active = active;
    trend.updatedAt = new Date();
    try {
      await trend.save();
      return trend;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

}