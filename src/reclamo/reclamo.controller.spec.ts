import { Test, TestingModule } from '@nestjs/testing';
import { ReclamoController } from './reclamo.controller';
import { ReclamoService } from './reclamo.service';

describe('ReclamoController', () => {
  let controller: ReclamoController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReclamoController],
      providers: [
        { provide: ReclamoService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ReclamoController>(ReclamoController);
  });

  afterEach(() => jest.clearAllMocks());

  it('debe crear un reclamo', async () => {
    mockService.create.mockResolvedValue({});

    const result = await controller.create({} as any, {
      archivos: [],
      imagenes: [],
    });

    expect(result).toBeDefined();
    expect(mockService.create).toHaveBeenCalled();
  });

  it('debe retornar todos los reclamos', async () => {
    mockService.findAll.mockResolvedValue([]);

    const result = await controller.findAll();

    expect(result).toEqual([]);
  });

  it('debe retornar un reclamo por id', async () => {
    mockService.findOne.mockResolvedValue({});

    const result = await controller.findOne('1');

    expect(result).toBeDefined();
  });

  it('debe actualizar un reclamo', async () => {
    mockService.update.mockResolvedValue({});

    const result = await controller.update(
      '1',
      {} as any,
      { archivos: [], imagenes: [] },
    );

    expect(result).toBeDefined();
  });

  it('debe eliminar un reclamo', async () => {
    mockService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});