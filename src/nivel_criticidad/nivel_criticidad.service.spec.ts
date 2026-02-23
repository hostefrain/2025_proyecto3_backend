import { Test, TestingModule } from '@nestjs/testing';
import { NivelCriticidadService } from './nivel_criticidad.service';
import { NotFoundException } from '@nestjs/common';

describe('NivelCriticidadService', () => {
  let service: NivelCriticidadService;
  let repository: any;

  const mockRepository = {
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
        NivelCriticidadService,
        {
          provide: 'INivelCriticidadRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<NivelCriticidadService>(NivelCriticidadService);
    repository = module.get('INivelCriticidadRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debe crear correctamente si no existe nombre', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.create.mockResolvedValue({ nombre: 'Alta' });

      const result = await service.create({ nombre: 'Alta' });

      expect(repository.findByName).toHaveBeenCalledWith('Alta');
      expect(repository.create).toHaveBeenCalled();
      expect(result).toEqual({ nombre: 'Alta' });
    });

    it('debe lanzar error si el nombre ya existe', async () => {
      repository.findByName.mockResolvedValue({ nombre: 'Alta' });

      await expect(
        service.create({ nombre: 'Alta' }),
      ).rejects.toThrow('El nombre Alta ya existe.');
    });
  });

  describe('findOne', () => {
    it('debe retornar entidad si existe', async () => {
      repository.findOne.mockResolvedValue({ id: '1' });

      const result = await service.findOne('1');

      expect(result).toEqual({ id: '1' });
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('debe actualizar correctamente', async () => {
      repository.findOne.mockResolvedValue({ id: '1' });
      repository.update.mockResolvedValue({ id: '1', nombre: 'Media' });

      const result = await service.update('1', { nombre: 'Media' });

      expect(repository.update).toHaveBeenCalledWith('1', { nombre: 'Media' });
      expect(result).toEqual({ id: '1', nombre: 'Media' });
    });
  });

  describe('remove', () => {
    it('debe eliminar correctamente', async () => {
      repository.findOne.mockResolvedValue({ id: '1' });
      repository.remove.mockResolvedValue(undefined);

      await service.remove('1');

      expect(repository.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('findAll', () => {
    it('debe retornar lista', async () => {
      repository.findAll.mockResolvedValue([{ nombre: 'Alta' }]);

      const result = await service.findAll();

      expect(result).toEqual([{ nombre: 'Alta' }]);
    });
  });
});