import { Test, TestingModule } from '@nestjs/testing';
import { ReclamoService } from './reclamo.service';
import { NotFoundException } from '@nestjs/common';
import { TipoReclamoService } from '../tipo_reclamo/tipo_reclamo.service';
import { PrioridadService } from '../prioridad/prioridad.service';
import { NivelCriticidadService } from '../nivel_criticidad/nivel_criticidad.service';
import { EstadoService } from '../estado/estado.service';
import { ProyectoService } from '../proyecto/proyecto.service';
import { AreaService } from '../area/area.service';

describe('ReclamoService', () => {
  let service: ReclamoService;

  const mockTipoReclamoService = { findById: jest.fn() };
  const mockPrioridadService = { findOne: jest.fn() };
  const mockNivelCriticidadService = { findOne: jest.fn() };
  const mockEstadoService = { findByName: jest.fn(), findById: jest.fn() };
  const mockProyectoService = { findOne: jest.fn() };
  const mockAreaService = { findOne: jest.fn() };

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReclamoService,
        { provide: TipoReclamoService, useValue: mockTipoReclamoService },
        { provide: PrioridadService, useValue: mockPrioridadService },
        { provide: NivelCriticidadService, useValue: mockNivelCriticidadService },
        { provide: EstadoService, useValue: mockEstadoService },
        { provide: ProyectoService, useValue: mockProyectoService },
        { provide: AreaService, useValue: mockAreaService },
        { provide: 'IReclamoRepository', useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ReclamoService>(ReclamoService);
  });

  afterEach(() => jest.clearAllMocks());

  const validDto: any = {
    descripcion: 'Test',
    proyectoId: '1',
    tipoReclamoId: '1',
    prioridadId: '1',
    nivelCriticidadId: '1',
    areaId: '1',
  };

  describe('create', () => {
    it('debe crear un reclamo correctamente', async () => {
      mockEstadoService.findByName.mockResolvedValue({ _id: '1' });
      mockTipoReclamoService.findById.mockResolvedValue({});
      mockPrioridadService.findOne.mockResolvedValue({});
      mockNivelCriticidadService.findOne.mockResolvedValue({});
      mockAreaService.findOne.mockResolvedValue({});
      mockProyectoService.findOne.mockResolvedValue({});
      mockRepository.create.mockResolvedValue({ _id: '1' });

      const result = await service.create(validDto, [], []);

      expect(result).toBeDefined();
      expect(mockRepository.create).toHaveBeenCalled();
    });

    it('debe lanzar excepción si no existe estado inicial', async () => {
      mockEstadoService.findByName.mockResolvedValue(null);

      await expect(
        service.create(validDto, [], []),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('debe retornar un reclamo', async () => {
      mockRepository.findOne.mockResolvedValue({ _id: '1' });

      const result = await service.findOne('1');

      expect(result).toBeDefined();
    });

    it('debe lanzar excepción si no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('debe eliminar correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ _id: '1' });
      mockRepository.remove.mockResolvedValue(undefined);

      await service.remove('1');

      expect(mockRepository.remove).toHaveBeenCalledWith('1');
    });

    it('debe lanzar excepción si no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});