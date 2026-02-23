import { Test, TestingModule } from '@nestjs/testing';
import { AccionService } from './accion.service';
import { AccionValidator } from './accion.validator';
import { ReclamoService } from '../reclamo/reclamo.service';
import { Types } from 'mongoose';

describe('AccionService', () => {
  let service: AccionService;

  const mockAccionValidator = {
    validarCreate: jest.fn(),
    validarUpdate: jest.fn(),
    validarRemove: jest.fn(),
  };

  const mockReclamoService = {
    update: jest.fn(),
  };

  const mockAccionRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccionService,
        { provide: AccionValidator, useValue: mockAccionValidator },
        { provide: ReclamoService, useValue: mockReclamoService },
        { provide: 'IAccionRepository', useValue: mockAccionRepository },
      ],
    }).compile();

    service = module.get<AccionService>(AccionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debe crear una accion correctamente', async () => {

      const reclamoId = new Types.ObjectId().toString();
      const estadoNuevoId = new Types.ObjectId().toString();
      const areaDestinoId = new Types.ObjectId().toString();
      const responsableId = new Types.ObjectId().toString();
      const estadoActualId = new Types.ObjectId().toString();
      const areaOrigenId = new Types.ObjectId().toString();

      const dto: any = {
        reclamoId,
        estadoNuevoId,
        areaDestinoId,
        responsableId,
      };

      mockAccionValidator.validarCreate.mockResolvedValue({
        estadoActualId,
        areaOrigenId,
      });

      mockAccionRepository.create.mockResolvedValue({ id: 'accion1' });

      const result = await service.create(dto);

      expect(mockAccionValidator.validarCreate).toHaveBeenCalledWith(dto);
      expect(mockAccionRepository.create).toHaveBeenCalled();

      expect(mockReclamoService.update).toHaveBeenCalledWith(reclamoId, {
        estadoId: estadoNuevoId,
      });

      expect(result).toEqual({ id: 'accion1' });
    });
  });

  describe('findAll', () => {
    it('debe retornar todas las acciones', async () => {
      mockAccionRepository.findAll.mockResolvedValue([{ id: 1 }]);

      const result = await service.findAll();

      expect(result).toEqual([{ id: 1 }]);
    });
  });

  describe('findOne', () => {
    it('debe retornar una accion por id', async () => {
      mockAccionRepository.findOne.mockResolvedValue({ id: '123' });

      const result = await service.findOne('123');

      expect(mockAccionRepository.findOne).toHaveBeenCalledWith('123');
      expect(result).toEqual({ id: '123' });
    });
  });

  describe('update', () => {
    it('debe validar y actualizar una accion', async () => {
      mockAccionRepository.update.mockResolvedValue({ updated: true });

      const result = await service.update('1', { descripcion: 'test' } as any);

      expect(mockAccionValidator.validarUpdate).toHaveBeenCalledWith('1', { descripcion: 'test' });
      expect(result).toEqual({ updated: true });
    });
  });

  describe('remove', () => {
    it('debe validar y eliminar una accion', async () => {
      mockAccionRepository.remove.mockResolvedValue({ deleted: true });

      const result = await service.remove('1');

      expect(mockAccionValidator.validarRemove).toHaveBeenCalledWith('1');
      expect(result).toEqual({ deleted: true });
    });
  });
});