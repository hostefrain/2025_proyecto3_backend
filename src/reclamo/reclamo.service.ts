import { Inject, Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { UpdateReclamoDto } from './dto/update-reclamo.dto';
import type { IReclamoRepository } from './IReclamoRepository';
import { TipoReclamoService } from 'src/tipo_reclamo/tipo_reclamo.service';
import { ProyectoService } from 'src/proyecto/proyecto.service';
import { PrioridadService } from 'src/prioridad/prioridad.service';
import { NivelCriticidadService } from 'src/nivel_criticidad/nivel_criticidad.service';
import { EstadoService } from 'src/estado/estado.service';

@Injectable()
export class ReclamoService {
  private readonly logger = new Logger(ReclamoService.name);

  constructor(
    @Inject('IReclamoRepository')
    private readonly reclamoRepository: IReclamoRepository,
    private readonly proyectoService: ProyectoService,
    private readonly tipoReclamoService: TipoReclamoService,
    private readonly prioridadService: PrioridadService,
    private readonly nivelCriticidadService: NivelCriticidadService,
    private readonly estadoService: EstadoService,
  ) {}

  async create(createReclamoDto: CreateReclamoDto) {
    this.logger.log('Creando nuevo reclamo');
    const {
        proyectoId,
        tipoReclamoId,
        prioridadId,
        nivelCriticidadId,
        estadoId,
    } = createReclamoDto;

    // Validaciones mínimas obligatorias
    const proyecto = await this.proyectoService.findOne(proyectoId);
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');

    const tipo = await this.tipoReclamoService.findById(tipoReclamoId);
    if (!tipo) throw new NotFoundException('Tipo de reclamo no encontrado');

    const prioridad = await this.prioridadService.findOne(prioridadId);
    if (!prioridad) throw new NotFoundException('Prioridad no encontrada');

    const criticidad = await this.nivelCriticidadService.findOne(nivelCriticidadId);
    if (!criticidad) throw new NotFoundException('Nivel de criticidad no encontrado');

    const estado = await this.estadoService.findById(estadoId);
    if (!estado) throw new NotFoundException('Estado no encontrado');

    // Si todo está bien, crear el reclamo
    return this.reclamoRepository.create(createReclamoDto);
  }

  async findAll() {
    return this.reclamoRepository.findAll();
  }

  async findOne(id: string) {
    return this.reclamoRepository.findOne(id);
  }

  async update(id: string, updateReclamoDto: UpdateReclamoDto) {
  }

  async remove(id: string) {
  }
}
