import { ProyectoRepository } from './proyecto.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('ProyectoRepository', () => {
  let repository: ProyectoRepository;
  let model: any;

  beforeEach(() => {
    model = {
      find: jest.fn(),
      findById: jest.fn(),
      findOne: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    repository = new ProyectoRepository(model);
  });

  it('findAll debe retornar datos', async () => {
    model.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });

    const result = await repository.findAll();

    expect(result).toEqual([]);
  });

    it('findAll debe lanzar error si falla', async () => {
    model.find.mockImplementation(() => {
        throw new Error('DB Error');
    });

    await expect(repository.findAll()).rejects.toThrow(
        InternalServerErrorException,
    );
    });

  it('remove debe ejecutarse correctamente', async () => {
    model.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

    await repository.remove('1');

    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});