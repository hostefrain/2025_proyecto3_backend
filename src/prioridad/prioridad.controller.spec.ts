import { Test, TestingModule } from '@nestjs/testing';
import { PrioridadController } from './prioridad.controller';
import { PrioridadService } from './prioridad.service';

describe('PrioridadController', () => {
  let controller: PrioridadController;
  let service: any;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByName: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrioridadController],
      providers: [
        {
          provide: PrioridadService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PrioridadController>(PrioridadController);
    service = module.get(PrioridadService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('create debe delegar al service', async () => {
    mockService.create.mockResolvedValue({ nombre: 'Alta' });

    const result = await controller.create({ nombre: 'Alta' });

    expect(service.create).toHaveBeenCalled();
    expect(result).toEqual({ nombre: 'Alta' });
  });

  it('findAll debe delegar al service', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne debe delegar al service', async () => {
    await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('update debe delegar al service', async () => {
    await controller.update('1', { nombre: 'Media' });
    expect(service.update).toHaveBeenCalledWith('1', { nombre: 'Media' });
  });

  it('remove debe delegar al service', async () => {
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});