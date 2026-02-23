import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoController } from './proyecto.controller';
import { ProyectoService } from './proyecto.service';

describe('ProyectoController', () => {
  let controller: ProyectoController;
  let service: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProyectoController],
      providers: [
        {
          provide: ProyectoService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProyectoController>(ProyectoController);
    service = module.get(ProyectoService);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('create debe delegar al service', async () => {
    const dto = { nombre: 'Proyecto A' };
    service.create.mockResolvedValue(dto);

    const result = await controller.create(dto as any);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(dto);
  });

  it('findAll debe delegar al service', async () => {
    service.findAll.mockResolvedValue([]);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('findOne debe delegar al service', async () => {
    service.findOne.mockResolvedValue({ id: '1' });

    const result = await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1' });
  });

  it('update debe delegar al service', async () => {
    const dto = { nombre: 'Nuevo' };
    service.update.mockResolvedValue(dto);

    const result = await controller.update('1', dto as any);

    expect(service.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(dto);
  });

  it('remove debe delegar al service', async () => {
    service.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith('1');
  });
});