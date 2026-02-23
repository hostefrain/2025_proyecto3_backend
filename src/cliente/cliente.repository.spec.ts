import { Test, TestingModule } from '@nestjs/testing';
import { ClienteRepository } from './cliente.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Cliente } from './schemas/cliente.schema';
import { InternalServerErrorException } from '@nestjs/common';

describe('ClienteRepository', () => {
  let repository: ClienteRepository;

  const mockClienteModel = {
    findById: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const mockSave = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteRepository,
        {
          provide: getModelToken(Cliente.name),
          useValue: jest.fn().mockImplementation(() => ({
            save: mockSave,
          })),
        },
      ],
    }).compile();

    repository = module.get<ClienteRepository>(ClienteRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create cliente', async () => {
    mockSave.mockResolvedValue({ nombre: 'Test' });

    const result = await repository.create({ nombre: 'Test' } as any);

    expect(result).toEqual({ nombre: 'Test' });
  });

  it('should find cliente by id', async () => {
    const execMock = jest.fn().mockResolvedValue({ id: '1' });

    repository['clienteModel'].findById = jest
      .fn()
      .mockReturnValue({ exec: execMock });

    const result = await repository.findById('1');

    expect(result).toEqual({ id: '1' });
  });

  it('should remove cliente', async () => {
    const execMock = jest.fn().mockResolvedValue(null);

    repository['clienteModel'].findByIdAndDelete = jest
      .fn()
      .mockReturnValue({ exec: execMock });

    await repository.remove('1');

    expect(execMock).toHaveBeenCalled();
  });
});