import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NivelCriticidadRepository } from './nivel_criticidad.repository';

describe('NivelCriticidadRepository', () => {
  let repository: NivelCriticidadRepository;
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
        NivelCriticidadRepository,
        {
          provide: getModelToken('NivelCriticidad'),
          useValue: mockModel,
        },
      ],
    }).compile();

    repository = module.get<NivelCriticidadRepository>(NivelCriticidadRepository);
    model = module.get(getModelToken('NivelCriticidad'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  it('findOne debe retornar resultado', async () => {
    model.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });

    const result = await repository.findOne('1');

    expect(result).toEqual({});
  });

  it('findAll debe retornar lista', async () => {
    model.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });

    const result = await repository.findAll();

    expect(result).toEqual([]);
  });

  it('update debe actualizar correctamente', async () => {
    model.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue({ nombre: 'Media' }),
    });

    const result = await repository.update('1', { nombre: 'Media' });

    expect(result).toEqual({ nombre: 'Media' });
  });

  it('remove debe eliminar correctamente', async () => {
    model.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(undefined),
    });

    await repository.remove('1');

    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});