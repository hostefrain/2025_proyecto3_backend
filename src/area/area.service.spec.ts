import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { AreaService } from './area.service';
import { IAreaRepository } from './IAreaRepository';

describe('AreaService', () => {
  let service: AreaService;
  let repository: jest.Mocked<IAreaRepository>;

  const mockRepository: jest.Mocked<IAreaRepository> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByName: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AreaService,
        {
          provide: 'IAreaRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AreaService>(AreaService);
    repository = module.get('IAreaRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // =============================
  // CREATE
  // =============================

  describe('create', () => {
    it('debe crear un area correctamente', async () => {
      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue({ id: '1', nombre: 'Soporte' } as any);

      const result = await service.create({ nombre: 'Soporte' });

      expect(mockRepository.findByName).toHaveBeenCalledWith('Soporte');
      expect(mockRepository.create).toHaveBeenCalled();
      expect(result).toEqual({ id: '1', nombre: 'Soporte' });
    });

    it('debe lanzar error si el nombre ya existe', async () => {
      mockRepository.findByName.mockResolvedValue({ id: '1' } as any);

      await expect(service.create({ nombre: 'Soporte' }))
        .rejects
        .toThrow(InternalServerErrorException);
    });
  });

  // =============================
  // FIND ALL
  // =============================

  describe('findAll', () => {
    it('debe retornar todas las areas', async () => {
      mockRepository.findAll.mockResolvedValue([{ id: '1' }] as any);

      const result = await service.findAll();

      expect(result).toEqual([{ id: '1' }]);
    });
  });

  // =============================
  // FIND ONE
  // =============================

  describe('findOne', () => {
    it('debe retornar un area por id', async () => {
      mockRepository.findOne.mockResolvedValue({ id: '1' } as any);

      const result = await service.findOne('1');

      expect(result).toEqual({ id: '1' });
    });
  });

  // =============================
  // UPDATE
  // =============================

  describe('update', () => {
    it('debe actualizar correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ id: '1', nombre: 'Soporte' } as any);
      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue({ id: '1', nombre: 'IT' } as any);

      const result = await service.update('1', { nombre: 'IT' });

      expect(mockRepository.update).toHaveBeenCalledWith('1', { nombre: 'IT' });
      expect(result).toEqual({ id: '1', nombre: 'IT' });
    });

    it('debe lanzar error si el area no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('1', { nombre: 'IT' }))
        .rejects
        .toThrow(InternalServerErrorException);
    });

    it('debe lanzar error si el nuevo nombre ya existe', async () => {
      mockRepository.findOne.mockResolvedValue({ id: '1' } as any);
      mockRepository.findByName.mockResolvedValue({ id: '2' } as any);

      await expect(service.update('1', { nombre: 'IT' }))
        .rejects
        .toThrow(InternalServerErrorException);
    });
  });

  // =============================
  // REMOVE
  // =============================

  describe('remove', () => {
    it('debe eliminar correctamente', async () => {
      mockRepository.findOne.mockResolvedValue({ id: '1' } as any);
      mockRepository.remove.mockResolvedValue();

      await service.remove('1');

      expect(mockRepository.remove).toHaveBeenCalledWith('1');
    });

    it('debe lanzar error si el area no existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('1'))
        .rejects
        .toThrow(InternalServerErrorException);
    });
  });
});