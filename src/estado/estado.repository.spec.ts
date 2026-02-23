import { Test, TestingModule } from '@nestjs/testing';
import { EstadoRepository } from './estado.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Estado } from './schemas/estado.schema';
import { InternalServerErrorException } from '@nestjs/common';

describe('EstadoRepository', () => {
  let repository: EstadoRepository;

  const mockSave = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstadoRepository,
        {
          provide: getModelToken(Estado.name),
          useValue: jest.fn().mockImplementation(() => ({
            save: mockSave,
          })),
        },
      ],
    }).compile();

    repository = module.get<EstadoRepository>(EstadoRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create estado', async () => {
    mockSave.mockResolvedValue({ nombre: 'Pendiente' });

    const result = await repository.create({ nombre: 'Pendiente' } as any);

    expect(result).toEqual({ nombre: 'Pendiente' });
  });

  it('should find estado by id', async () => {
    const execMock = jest.fn().mockResolvedValue({ id: '1' });

    repository['estadoModel'].findById = jest
      .fn()
      .mockReturnValue({ exec: execMock });

    const result = await repository.findById('1');

    expect(result).toEqual({ id: '1' });
  });

  it('should remove estado', async () => {
    const execMock = jest.fn().mockResolvedValue(null);

    repository['estadoModel'].findByIdAndDelete = jest
      .fn()
      .mockReturnValue({ exec: execMock });

    await repository.remove('1');

    expect(execMock).toHaveBeenCalled();
  });
});