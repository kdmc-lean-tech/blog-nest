import { Injectable, NotFoundException } from '@nestjs/common';
import { TrendRepository } from '../repository/trend.repository';
import { Trend } from '../../../models/trend.entity';
import { CreateTrendDto } from '../../../dtos/create-trend.dto';
import { ActiveEntityDto } from '../../../dtos/active-entity.dto';

@Injectable()
export class TrendService {
  constructor(private _trendRepository: TrendRepository) {
  }

  public async getTrendById(id: number): Promise<Trend> {
    const trend = await this._trendRepository.findOne(id);
    if (!trend) {
      throw new NotFoundException(`The id ${id} not found`);
    }
    return trend;
  }

  public async updateTrendById(id: number, createTrendDto: CreateTrendDto): Promise<Trend> {
    const trend = await this.getTrendById(id);
    if (!trend) {
      throw new NotFoundException(`The id ${id} not found`);
    }
    return await this._trendRepository.updateTrendByEntity(createTrendDto, trend);
  }

  public async createTrend(createTrendDto: CreateTrendDto): Promise<Trend> {
    return await this._trendRepository.createTrend(createTrendDto);
  }

  public async getTrends(): Promise<Trend[]> {
    return await this._trendRepository.getTrends();
  }

  public async changeStatusTrendById(id: number, activeEntityDto: ActiveEntityDto): Promise<Trend> {
    const trend = await this.getTrendById(id);
    if (!trend) {
      throw new NotFoundException(`The id ${id} not found`);
    }
    return this._trendRepository.changeStatusTrendByEntity(trend, activeEntityDto);
  }
}
