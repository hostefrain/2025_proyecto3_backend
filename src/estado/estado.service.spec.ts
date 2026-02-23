import { Test, TestingModule } from '@nestjs/testing';
import { EstadoService } from './estado.service';
import { BadRequestException } from '@nestjs/common';

describe('EstadoService', () => {
  let service: EstadoService;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByName: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstadoService,
        {
          provide: 'IEstadoRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EstadoService>(EstadoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create estado if name does not exist', async () => {
      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue({ nombre: 'Pendiente' });

      const result = await service.create({ nombre: 'Pendiente' } as any);

      expect(result).toEqual({ nombre: 'Pendiente' });
    });

    it('should throw BadRequestException if name already exists', async () => {
      mockRepository.findByName.mockResolvedValue({ nombre: 'Pendiente' });

      await expect(
        service.create({ nombre: 'Pendiente' } as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findById', () => {
    it('should return estado if exists', async () => {
      mockRepository.findById.mockResolvedValue({ id: '1' });

      const result = await service.findById('1');

      expect(result).toEqual({ id: '1' });
    });

    it('should throw BadRequestException if estado does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findById('1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update estado', async () => {
      mockRepository.findById.mockResolvedValue({ id: '1' });
      mockRepository.update.mockResolvedValue({ nombre: 'Finalizado' });

      const result = await service.update('1', { nombre: 'Finalizado' });

      expect(result).toEqual({ nombre: 'Finalizado' });
    });
  });

  describe('remove', () => {
    it('should remove estado if exists', async () => {
      mockRepository.findById.mockResolvedValue({ id: '1' });
      mockRepository.remove.mockResolvedValue(undefined);

      await service.remove('1');

      expect(mockRepository.remove).toHaveBeenCalledWith('1');
    });
  });
});