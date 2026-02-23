import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { NotFoundException } from '@nestjs/common';
import { TipoProyectoService } from '../tipo_proyecto/tipo_proyecto.service';
import { ClienteService } from '../cliente/cliente.service';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let mockTipoProyectoService: any;
  let mockClienteService: any;
  let mockRepository: any;

  beforeEach(async () => {
    mockTipoProyectoService = {
      findById: jest.fn(),
    };

    mockClienteService = {
      findById: jest.fn(),
    };

    mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByName: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        { provide: TipoProyectoService, useValue: mockTipoProyectoService },
        { provide: ClienteService, useValue: mockClienteService },
        { provide: 'IProyectoRepository', useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('remove', () => {
    it('debe eliminar correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ _id: '1' });
      mockRepository.remove.mockResolvedValue({});

      const result = await service.remove('1');

      expect(mockRepository.remove).toHaveBeenCalledWith('1');
      expect(result).toBeDefined();
    });

    it('debe lanzar error si no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('debe lanzar error si proyecto no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update('1', { nombre: 'Nuevo' } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });
});