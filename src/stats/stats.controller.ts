import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  /**
   * Dashboard completo
   * Permite filtrar por:
   * proyectoId, tipoReclamoId, areaId, estadoId, desde, hasta
   */
  @Get('overview')
  async overview(@Query() query) {
    return this.statsService.overview(query);
  }

  /** Total de reclamos por mes */
  @Get('by-month')
  async byMonth(@Query() query) {
    return this.statsService.byMonth(query);
  }

  /** En curso vs resueltos */
  @Get('status')
  async status(@Query() query) {
    return this.statsService.statusStats(query);
  }

  /** Tipos de reclamos más comunes */
  @Get('common-types')
  async commonTypes(@Query() query) {
    return this.statsService.mostCommonTypes(query);
  }

  /** Carga laboral por área */
  @Get('workload')
  async workload(@Query() query) {
    return this.statsService.workloadByArea(query);
  }

  /** Reclamos agrupados por cliente */
  @Get('by-client')
  async byClient(@Query() query) {
    return this.statsService.byClient(query);
  }

  /** Tiempo promedio de resolución */
  @Get('avg-resolution')
  async avgResolution(@Query() query) {
    return this.statsService.avgResolutionByType(query);
  }
}
