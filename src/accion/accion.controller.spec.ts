import { Test, TestingModule } from '@nestjs/testing';
import { AccionController } from './accion.controller';
import { AccionService } from './accion.service';

describe('AccionController', () => {
  let controller: AccionController;

  const mockAccionService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccionController],
      providers: [
        { provide: AccionService, useValue: mockAccionService },
      ],
    }).compile();

    controller = module.get<AccionController>(AccionController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe crear una accion', async () => {
    mockAccionService.create.mockResolvedValue({ id: 1 });

    const result = await controller.create({} as any);

    expect(result).toEqual({ id: 1 });
  });

  it('debe retornar todas las acciones', async () => {
    mockAccionService.findAll.mockResolvedValue([{ id: 1 }]);

    const result = await controller.findAll();

    expect(result).toEqual([{ id: 1 }]);
  });

  it('debe retornar una accion', async () => {
    mockAccionService.findOne.mockResolvedValue({ id: 1 });

    const result = await controller.findOne('1');

    expect(result).toEqual({ id: 1 });
  });

  it('debe actualizar una accion', async () => {
    mockAccionService.update.mockResolvedValue({ updated: true });

    const result = await controller.update('1', {} as any);

    expect(result).toEqual({ updated: true });
  });

  it('debe eliminar una accion', async () => {
    mockAccionService.remove.mockResolvedValue({ deleted: true });

    const result = await controller.remove('1');

    expect(result).toEqual({ deleted: true });
  });
});