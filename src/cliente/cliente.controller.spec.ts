import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  const mockClienteService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: ClienteService,
          useValue: mockClienteService,
        },
      ],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create cliente', async () => {
    const dto = { nombre: 'Cliente Test' };
    mockClienteService.create.mockResolvedValue(dto);

    const result = await controller.create(dto as any);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(dto);
  });

  it('should return all clientes', async () => {
    const clientes = [{ nombre: 'Test' }];
    mockClienteService.findAll.mockResolvedValue(clientes);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(clientes);
  });

  it('should return one cliente by id', async () => {
    const cliente = { id: '1', nombre: 'Test' };
    mockClienteService.findById.mockResolvedValue(cliente);

    const result = await controller.findOne('1');

    expect(service.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(cliente);
  });

  it('should update cliente', async () => {
    const dto = { nombre: 'Nuevo' };
    mockClienteService.update.mockResolvedValue(dto);

    const result = await controller.update('1', dto as any);

    expect(service.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(dto);
  });

  it('should remove cliente', async () => {
    mockClienteService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith('1');
  });
});