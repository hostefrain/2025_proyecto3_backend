import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reclamo, ReclamoDocument } from '../reclamo/schemas/reclamo.schema';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Reclamo.name)
    private readonly reclamoModel: Model<ReclamoDocument>,
  ) {}

  // ========================
  // FILTROS DINÁMICOS
  // ========================
  private buildFilters(query: any) {
    const filters: any = {};

    if (query.proyectoId)
      filters.proyectoId = new Types.ObjectId(query.proyectoId);

    if (query.tipoReclamoId)
      filters.tipoReclamoId = new Types.ObjectId(query.tipoReclamoId);

    if (query.areaId)
      filters.areaId = new Types.ObjectId(query.areaId);

    if (query.estadoId)
      filters.estadoId = new Types.ObjectId(query.estadoId);

    if (query.desde && query.hasta) {
      filters.createdAt = {
        $gte: new Date(query.desde),
        $lte: new Date(query.hasta),
      };
    }

    return filters;
  }

  // ========================
  // DASHBOARD COMPLETO
  // ========================
  async overview(query: any) {
    const filters = this.buildFilters(query);

    const [
      byMonth,
      status,
      commonTypes,
      workload,
      byClient,
    ] = await Promise.all([
      this.byMonth(filters),
      this.statusStats(filters),
      this.mostCommonTypes(filters),
      this.workloadByArea(filters),
      this.byClient(filters),
    ]);

    return {
      byMonth,
      status,
      commonTypes,
      workload,
      byClient,
    };
  }

  // ========================
  // RECLAMOS POR MES
  // ========================
  async byMonth(filters: any) {
    return this.reclamoModel.aggregate([
      { $match: filters },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);
  }

  // ========================
  // EN CURSO VS RESUELTOS
  // ========================
  async statusStats(filters: any) {
    return this.reclamoModel.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: 'estados',
          localField: 'estadoId',
          foreignField: '_id',
          as: 'estado',
        },
      },
      { $unwind: '$estado' },
      {
        $group: {
          _id: '$estado.nombre',
          total: { $sum: 1 },
        },
      },
    ]);
  }

  // ========================
  // TIPOS MÁS FRECUENTES
  // ========================
  async mostCommonTypes(filters: any) {
    return this.reclamoModel.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: 'tiporeclamos',
          localField: 'tipoReclamoId',
          foreignField: '_id',
          as: 'tipo',
        },
      },
      { $unwind: '$tipo' },
      {
        $group: {
          _id: '$tipo.nombre',
          total: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 10 },
    ]);
  }

  // ========================
  // CARGA DE TRABAJO POR ÁREA
  // ========================
  async workloadByArea(filters: any) {
    return this.reclamoModel.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: 'areas',
          localField: 'areaId',
          foreignField: '_id',
          as: 'area',
        },
      },
      { $unwind: '$area' },
      {
        $group: {
          _id: '$area.nombre',
          total: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);
  }

  // ========================
  // RECLAMOS POR CLIENTE
  // ========================
  async byClient(filters: any) {
    return this.reclamoModel.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: 'proyectos',
          localField: 'proyectoId',
          foreignField: '_id',
          as: 'proyecto',
        },
      },
      { $unwind: '$proyecto' },
      {
        $lookup: {
          from: 'clientes',
          localField: 'proyecto.clienteId',
          foreignField: '_id',
          as: 'cliente',
        },
      },
      { $unwind: '$cliente' },
      {
        $group: {
          _id: '$cliente.nombre',
          total: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);
  }

  // ========================
  // TIEMPO PROMEDIO DE RESOLUCIÓN (PRO)
  // ========================
  async avgResolutionByType(filters: any) {
    return this.reclamoModel.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: 'acciones',
          localField: 'acciones',
          foreignField: '_id',
          as: 'accionesData',
        },
      },
      {
        $addFields: {
          fechaResolucion: { $max: '$accionesData.fecha' },
        },
      },
      {
        $project: {
          tipoReclamoId: 1,
          tiempoDias: {
            $divide: [
              { $subtract: ['$fechaResolucion', '$createdAt'] },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'tiporeclamos',
          localField: 'tipoReclamoId',
          foreignField: '_id',
          as: 'tipo',
        },
      },
      { $unwind: '$tipo' },
      {
        $group: {
          _id: '$tipo.nombre',
          promedioDias: { $avg: '$tiempoDias' },
        },
      },
    ]);
  }
}
