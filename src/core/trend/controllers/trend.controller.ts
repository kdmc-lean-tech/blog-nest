import { Controller, Get, Post, Body, UseGuards, Put, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { TrendService } from '../services/trend.service';
import { CreateTrendDto } from '../../../dtos/create-trend.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/enums/roles.enum';
import { ActiveEntityDto } from '../../../dtos/active-entity.dto';

@Controller('trend')
export class TrendController {
  constructor(private _trendService: TrendService) {
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles(ROLES.USER, ROLES.ADMIN)
  async getTrends() {
    return await this._trendService.getTrends();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles(ROLES.ADMIN)
  async createTrend(@Body() createTrendDto: CreateTrendDto) {
    return await this._trendService.createTrend(createTrendDto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @Roles(ROLES.ADMIN)
  async updateTrend(
    @Body() createTrendDto: CreateTrendDto, 
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this._trendService.updateTrendById(id, createTrendDto);
  }

  @Patch('/:id/active')
  @UseGuards(AuthGuard('jwt'))
  @Roles(ROLES.ADMIN)
  async changeStatusTrend(
    @Param('id', ParseIntPipe) id: number,
    @Body() activeEntityDto: ActiveEntityDto
  ) {
    return await this._trendService.changeStatusTrendById(id, activeEntityDto);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @Roles(ROLES.ADMIN, ROLES.USER)
  async getTrendById(
    @Param('id') id: number
  ) {
    return await this._trendService.getTrendById(id);
  }
}
