import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { InternalServerErrorException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AccionRepository } from './accion.repository';
import { Accion } from './schemas/accion.schema';

describe('AccionRepository', () => {
  let repository: AccionRepository;
  let model: jest.Mocked<Model<any>>;

  const mockModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccionRepository,
        {
          provide: getModelToken(Accion.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<AccionRepository>(AccionRepository);
    model = module.get(getModelToken(Accion.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // =========================
  // CREATE
  // =========================

  describe('create', () => {
    it('debe crear una accion correctamente', async () => {
      const saveMock = jest.fn().mockResolvedValue({ id: '1' });

      const mockConstructor = jest.fn().mockImplementation(() => ({
        save: saveMock,
      }));

      (repository as any).accionModel = mockConstructor;

      const result = await repository.create({} as any);

      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });

    it('debe lanzar InternalServerErrorException si falla', async () => {
      const saveMock = jest.fn().mockRejectedValue(new Error('DB Error'));

      const mockConstructor = jest.fn().mockImplementation(() => ({
        save: saveMock,
      }));

      (repository as any).accionModel = mockConstructor;

      await expect(repository.create({} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // =========================
  // FIND BY RECLAMO
  // =========================

    describe('findByReclamo', () => {
    it('debe ejecutar la cadena de populate y sort', async () => {

        const sortMock = jest.fn().mockResolvedValue([{ id: '1' }]);

        const populate3 = { sort: sortMock };
        const populate2 = { populate: jest.fn().mockReturnValue(populate3) };
        const populate1 = { populate: jest.fn().mockReturnValue(populate2) };

        mockModel.find.mockReturnValue({
        populate: jest.fn().mockReturnValue(populate1),
        } as any);

        const result = await repository.findByReclamo('123');

        expect(mockModel.find).toHaveBeenCalledWith({ reclamoId: '123' });
        expect(result).toEqual([{ id: '1' }]);
    });
    });

  // =========================
  // FIND ONE
  // =========================

  describe('findOne', () => {
    it('debe devolver una accion', async () => {
      mockModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ id: '1' }),
      } as any);

      const result = await repository.findOne('1');

      expect(result).toEqual({ id: '1' });
    });

    it('debe lanzar exception si falla', async () => {
      mockModel.findById.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(repository.findOne('1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // =========================
  // FIND ALL
  // =========================

  describe('findAll', () => {
    it('debe devolver todas las acciones', async () => {
      mockModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ id: '1' }]),
      } as any);

      const result = await repository.findAll();

      expect(result).toEqual([{ id: '1' }]);
    });

    it('debe lanzar exception si falla', async () => {
      mockModel.find.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(repository.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // =========================
  // UPDATE
  // =========================

  describe('update', () => {
    it('debe actualizar con ObjectId cuando vienen areaOrigenId y estadoActualId', async () => {
      const id = '1';
      const areaOrigenId = new Types.ObjectId().toString();
      const estadoActualId = new Types.ObjectId().toString();

      mockModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ id }),
      } as any);

      const result = await repository.update(id, {
        areaOrigenId,
        estadoActualId,
      } as any);

      expect(mockModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual({ id });
    });

    it('debe lanzar exception si falla', async () => {
      mockModel.findByIdAndUpdate.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(repository.update('1', {} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // =========================
  // REMOVE
  // =========================

  describe('remove', () => {
    it('debe eliminar correctamente', async () => {
      mockModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await repository.remove('1');

      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });

    it('debe lanzar exception si falla', async () => {
      mockModel.findByIdAndDelete.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(repository.remove('1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});