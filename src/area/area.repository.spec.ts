import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { AreaRepository } from './area.repository';
import { Area } from './schemas/area.schema';

describe('AreaRepository', () => {
  let repository: AreaRepository;
  let model: jest.Mocked<Model<any>>;

  const mockModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AreaRepository,
        {
          provide: getModelToken(Area.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<AreaRepository>(AreaRepository);
    model = module.get(getModelToken(Area.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // =============================
  // CREATE
  // =============================

  describe('create', () => {
    it('debe crear un area correctamente', async () => {
      const saveMock = jest.fn().mockResolvedValue({ id: '1', nombre: 'IT' });

      const mockConstructor = jest.fn().mockImplementation(() => ({
        save: saveMock,
      }));

      (repository as any).areaModel = mockConstructor;

      const result = await repository.create({ nombre: 'IT' });

      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual({ id: '1', nombre: 'IT' });
    });

    it('debe lanzar InternalServerErrorException si falla', async () => {
      const saveMock = jest.fn().mockRejectedValue(new Error('DB Error'));

      const mockConstructor = jest.fn().mockImplementation(() => ({
        save: saveMock,
      }));

      (repository as any).areaModel = mockConstructor;

      await expect(repository.create({ nombre: 'IT' }))
        .rejects
        .toThrow(InternalServerErrorException);
    });
  });

  // =============================
  // FIND ONE
  // =============================

  describe('findOne', () => {
    it('debe retornar un area por id', async () => {
      model.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ id: '1' }),
      } as any);

      const result = await repository.findOne('1');

      expect(result).toEqual({ id: '1' });
    });

    it('debe lanzar error si falla', async () => {
      model.findById.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(repository.findOne('1'))
        .rejects
        .toThrow(InternalServerErrorException);
    });
  });

  // =============================
  // FIND BY NAME
  // =============================

  describe('findByName', () => {
    it('debe retornar un area por nombre', async () => {
      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ id: '1', nombre: 'IT' }),
      } as any);

      const result = await repository.findByName('IT');

      expect(model.findOne).toHaveBeenCalledWith({ nombre: 'IT' });
      expect(result).toEqual({ id: '1', nombre: 'IT' });
    });

    it('debe lanzar error si falla', async () => {
      model.findOne.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(repository.findByName('IT'))
        .rejects
        .toThrow(InternalServerErrorException);
    });
  });

  // =============================
  // FIND ALL
  // =============================

  describe('findAll', () => {
    it('debe retornar todas las areas', async () => {
      model.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ id: '1' }]),
      } as any);

      const result = await repository.findAll();

      expect(result).toEqual([{ id: '1' }]);
    });

    it('debe lanzar error si falla', async () => {
      model.find.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(repository.findAll())
        .rejects
        .toThrow(InternalServerErrorException);
    });
  });

  // =============================
  // UPDATE
  // =============================

  describe('update', () => {
    it('debe actualizar correctamente', async () => {
      model.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ id: '1', nombre: 'RRHH' }),
      } as any);

      const result = await repository.update('1', { nombre: 'RRHH' });

      expect(model.findByIdAndUpdate)
        .toHaveBeenCalledWith('1', { nombre: 'RRHH' }, { new: true });

      expect(result).toEqual({ id: '1', nombre: 'RRHH' });
    });

    it('debe lanzar error si falla', async () => {
      model.findByIdAndUpdate.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(repository.update('1', { nombre: 'RRHH' }))
        .rejects
        .toThrow(InternalServerErrorException);
    });
  });

  // =============================
  // REMOVE
  // =============================

  describe('remove', () => {
    it('debe eliminar correctamente', async () => {
      model.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await repository.remove('1');

      expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
    });

    it('debe lanzar error si falla', async () => {
      model.findByIdAndDelete.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(repository.remove('1'))
        .rejects
        .toThrow(InternalServerErrorException);
    });
  });
});