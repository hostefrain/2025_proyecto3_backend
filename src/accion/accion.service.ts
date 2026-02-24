import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';
import type { IAccionRepository } from './IAccionRepository';
import { ReclamoService } from '../reclamo/reclamo.service';
import { AccionValidator } from './accion.validator';
import { AccionMapper } from './mapper/accion.mapper';

@Injectable()
export class AccionService {
  private readonly logger = new Logger(AccionService.name);
  private readonly ENTITY_NAME = 'Accion';

  constructor(
    private readonly accionValidator: AccionValidator,
    private readonly reclamoService: ReclamoService,
    @Inject('IAccionRepository') 
    private readonly accionRepository: IAccionRepository,
  ) {}

  async create(createAccionDto: CreateAccionDto) {
    this.logger.log(`Creando una nueva ${this.ENTITY_NAME}`);

    const { estadoActualId, areaOrigenId } =
      await this.accionValidator.validarCreate(createAccionDto);

    const accionPersistence = AccionMapper.toPersistence(
      createAccionDto,
      estadoActualId,
      areaOrigenId,
    );

    const nuevaAccion = await this.accionRepository.create(accionPersistence);

    await this.reclamoService.update(createAccionDto.reclamoId, {
      estadoId: createAccionDto.estadoNuevoId,
    });

    return nuevaAccion;
  }

  async findByReclamo(reclamoId: string) {
    this.logger.log(`Buscando acciones del reclamo ${reclamoId}`);

    // Validar que el reclamo exista
    await this.accionValidator.validarFindByReclamo(reclamoId);

    return this.accionRepository.findByReclamo(reclamoId);
  }

  async findAll() {
    this.logger.log(`Buscando todos los ${this.ENTITY_NAME}s`);
    return this.accionRepository.findAll();
  }

  async findOne(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con id ${id}`);
    return this.accionRepository.findOne(id);
  }

  async update(id: string, updateDto: UpdateAccionDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`);

    await this.accionValidator.validarUpdate(id, updateDto);

    return this.accionRepository.update(id, updateDto);
  }


  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`);
    await this.accionValidator.validarRemove(id);
    return this.accionRepository.remove(id);
  }
}
