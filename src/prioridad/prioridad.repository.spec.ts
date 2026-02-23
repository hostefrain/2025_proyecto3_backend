import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PrioridadRepository } from './prioridad.repository';
import { NotFoundException } from '@nestjs/common';

describe('PrioridadRepository', () => {
  let repository: PrioridadRepository;
  let model: any;

  const mockModel = {
    findById: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrioridadRepository,
        {
          provide: getModelToken('Prioridad'),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<PrioridadRepository>(PrioridadRepository);
    model = module.get(getModelToken('Prioridad'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('findOne', () => {
    it('debe retornar prioridad si existe', async () => {
      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ id: '1' }),
      });

      const result = await repository.findOne('1');
      expect(result).toEqual({ id: '1' });
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(repository.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar correctamente', async () => {
      model.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ nombre: 'Media' }),
      });

      const result = await repository.update('1', { nombre: 'Media' });
      expect(result).toEqual({ nombre: 'Media' });
    });
  });

  describe('remove', () => {
    it('debe eliminar correctamente', async () => {
      model.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue({}),
      });

      await repository.remove('1');
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });

  describe('findAll', () => {
    it('debe retornar lista', async () => {
      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      });

      const result = await repository.findAll();
      expect(result).toEqual([]);
    });
  });
});