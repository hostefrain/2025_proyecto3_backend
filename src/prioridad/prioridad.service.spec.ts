import { Test, TestingModule } from '@nestjs/testing';
import { PrioridadService } from './prioridad.service';
import { NotFoundException } from '@nestjs/common';

describe('PrioridadService', () => {
  let service: PrioridadService;
  let repository: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    findByName: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByName: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrioridadService,
        {
          provide: 'IPrioridadRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PrioridadService>(PrioridadService);
    repository = module.get('IPrioridadRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debe crear si no existe nombre', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.create.mockResolvedValue({ nombre: 'Alta' });

      const result = await service.create({ nombre: 'Alta' });

      expect(repository.findByName).toHaveBeenCalledWith('Alta');
      expect(repository.create).toHaveBeenCalledWith({ nombre: 'Alta' });
      expect(result).toEqual({ nombre: 'Alta' });
    });

    it('debe lanzar NotFoundException si nombre existe', async () => {
      repository.findByName.mockResolvedValue({ nombre: 'Alta' });

      await expect(
        service.create({ nombre: 'Alta' }),
      ).rejects.toThrow(NotFoundException);

      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('debe retornar lista', async () => {
      repository.findAll.mockResolvedValue([{ nombre: 'Alta' }]);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([{ nombre: 'Alta' }]);
    });
  });

  describe('findOne', () => {
    it('debe retornar prioridad si existe', async () => {
      repository.findOne.mockResolvedValue({ id: '1' });

      const result = await service.findOne('1');

      expect(repository.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('update', () => {
    it('debe actualizar si existe', async () => {
      repository.findOne.mockResolvedValue({ id: '1' });
      repository.update.mockResolvedValue({ id: '1', nombre: 'Media' });

      const result = await service.update('1', { nombre: 'Media' });

      expect(repository.findOne).toHaveBeenCalledWith('1');
      expect(repository.update).toHaveBeenCalledWith('1', { nombre: 'Media' });
      expect(result).toEqual({ id: '1', nombre: 'Media' });
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.update('1', { nombre: 'Media' }),
      ).rejects.toThrow(NotFoundException);

      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('debe eliminar si existe', async () => {
      repository.findOne.mockResolvedValue({ id: '1' });
      repository.remove.mockResolvedValue(undefined);

      await service.remove('1');

      expect(repository.findOne).toHaveBeenCalledWith('1');
      expect(repository.remove).toHaveBeenCalledWith('1');
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);

      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});