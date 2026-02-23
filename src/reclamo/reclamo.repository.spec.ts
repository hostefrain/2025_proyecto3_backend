import { ReclamoRepository } from './reclamo.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('ReclamoRepository', () => {
  let repository: ReclamoRepository;
  let mockModel: any;

  beforeEach(() => {
    mockModel = {
      findById: jest.fn(),
      find: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    repository = new ReclamoRepository(mockModel);
  });

  afterEach(() => jest.clearAllMocks());

  it('debe buscar un reclamo por id', async () => {
    mockModel.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });

    const result = await repository.findOne('1');

    expect(result).toBeDefined();
  });

  it('debe retornar lista de reclamos', async () => {
    mockModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });

    const result = await repository.findAll();

    expect(result).toEqual([]);
  });

  it('debe actualizar reclamo', async () => {
    mockModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue({}),
    });

    const result = await repository.update('1', {} as any, [], []);

    expect(result).toBeDefined();
  });

  it('debe eliminar reclamo', async () => {
    mockModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue({}),
    });

    await repository.remove('1');

    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it('debe lanzar error si falla búsqueda', async () => {
    mockModel.findById.mockImplementation(() => {
      throw new Error();
    });

    await expect(repository.findOne('1')).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});