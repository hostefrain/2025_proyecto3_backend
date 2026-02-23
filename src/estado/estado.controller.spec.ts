import { Test, TestingModule } from '@nestjs/testing';
import { EstadoController } from './estado.controller';
import { EstadoService } from './estado.service';

describe('EstadoController', () => {
  let controller: EstadoController;
  let service: EstadoService;

  const mockEstadoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoController],
      providers: [
        {
          provide: EstadoService,
          useValue: mockEstadoService,
        },
      ],
    }).compile();

    controller = module.get<EstadoController>(EstadoController);
    service = module.get<EstadoService>(EstadoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create estado', async () => {
    const dto = { nombre: 'Pendiente' };
    mockEstadoService.create.mockResolvedValue(dto);

    const result = await controller.create(dto as any);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(dto);
  });

  it('should return all estados', async () => {
    const estados = [{ nombre: 'Pendiente' }];
    mockEstadoService.findAll.mockResolvedValue(estados);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(estados);
  });

  it('should return one estado by id', async () => {
    const estado = { id: '1', nombre: 'Pendiente' };
    mockEstadoService.findById.mockResolvedValue(estado);

    const result = await controller.findOne('1');

    expect(service.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(estado);
  });

  it('should update estado', async () => {
    const dto = { nombre: 'Finalizado' };
    mockEstadoService.update.mockResolvedValue(dto);

    const result = await controller.update('1', dto as any);

    expect(service.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(dto);
  });

  it('should remove estado', async () => {
    mockEstadoService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith('1');
  });
});