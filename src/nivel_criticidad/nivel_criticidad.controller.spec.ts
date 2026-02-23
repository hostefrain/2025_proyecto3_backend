import { Test, TestingModule } from '@nestjs/testing';
import { NivelCriticidadController } from './nivel_criticidad.controller';
import { NivelCriticidadService } from './nivel_criticidad.service';

describe('NivelCriticidadController', () => {
  let controller: NivelCriticidadController;
  let service: any;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelCriticidadController],
      providers: [
        {
          provide: NivelCriticidadService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<NivelCriticidadController>(NivelCriticidadController);
    service = module.get(NivelCriticidadService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('create debe llamar al service', async () => {
    mockService.create.mockResolvedValue({ nombre: 'Alta' });

    const result = await controller.create({ nombre: 'Alta' });

    expect(service.create).toHaveBeenCalled();
    expect(result).toEqual({ nombre: 'Alta' });
  });

  it('findAll debe llamar al service', async () => {
    mockService.findAll.mockResolvedValue([]);

    await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne debe llamar al service', async () => {
    await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('update debe llamar al service', async () => {
    await controller.update('1', { nombre: 'Media' });

    expect(service.update).toHaveBeenCalledWith('1', { nombre: 'Media' });
  });

  it('remove debe llamar al service', async () => {
    await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith('1');
  });
});