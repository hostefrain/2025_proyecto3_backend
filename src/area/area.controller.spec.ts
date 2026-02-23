import { Test, TestingModule } from '@nestjs/testing';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';

describe('AreaController', () => {
  let controller: AreaController;
  let service: jest.Mocked<AreaService>;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreaController],
      providers: [
        {
          provide: AreaService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AreaController>(AreaController);
    service = module.get(AreaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // =============================
  // CREATE
  // =============================

  it('debe crear un area', async () => {
    mockService.create.mockResolvedValue({ id: '1' } as any);

    const result = await controller.create({ nombre: 'Soporte' });

    expect(service.create).toHaveBeenCalledWith({ nombre: 'Soporte' });
    expect(result).toEqual({ id: '1' });
  });

  // =============================
  // FIND ALL
  // =============================

  it('debe retornar todas las areas', async () => {
    mockService.findAll.mockResolvedValue([{ id: '1' }] as any);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([{ id: '1' }]);
  });

  // =============================
  // FIND ONE
  // =============================

  it('debe retornar un area por id', async () => {
    mockService.findOne.mockResolvedValue({ id: '1' } as any);

    const result = await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1' });
  });

  // =============================
  // UPDATE
  // =============================

  it('debe actualizar un area', async () => {
    mockService.update.mockResolvedValue({ id: '1', nombre: 'IT' } as any);

    const result = await controller.update('1', { nombre: 'IT' });

    expect(service.update).toHaveBeenCalledWith('1', { nombre: 'IT' });
    expect(result).toEqual({ id: '1', nombre: 'IT' });
  });

  // =============================
  // REMOVE
  // =============================

  it('debe eliminar un area', async () => {
    mockService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith('1');
  });
});