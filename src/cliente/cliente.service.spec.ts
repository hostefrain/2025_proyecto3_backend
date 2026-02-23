import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('ClienteService', () => {
  let service: ClienteService;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByName: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: 'IClienteRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create cliente if name does not exist', async () => {
      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue({ nombre: 'Test' });

      const result = await service.create({ nombre: 'Test' } as any);

      expect(result).toEqual({ nombre: 'Test' });
    });

    it('should throw error if name already exists', async () => {
      mockRepository.findByName.mockResolvedValue({ nombre: 'Test' });

      await expect(
        service.create({ nombre: 'Test' } as any),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findById', () => {
    it('should return cliente if exists', async () => {
      mockRepository.findById.mockResolvedValue({ id: '1' });

      const result = await service.findById('1');

      expect(result).toEqual({ id: '1' });
    });

    it('should throw error if cliente does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findById('1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('should update cliente', async () => {
      mockRepository.findById.mockResolvedValue({ id: '1' });
      mockRepository.findByName.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue({ nombre: 'Nuevo' });

      const result = await service.update('1', { nombre: 'Nuevo' });

      expect(result).toEqual({ nombre: 'Nuevo' });
    });
  });

  describe('remove', () => {
    it('should remove cliente if exists', async () => {
      mockRepository.findById.mockResolvedValue({ id: '1' });
      mockRepository.remove.mockResolvedValue(undefined);

      await service.remove('1');

      expect(mockRepository.remove).toHaveBeenCalledWith('1');
    });
  });
});