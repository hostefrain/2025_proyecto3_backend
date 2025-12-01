import { Test, TestingModule } from '@nestjs/testing';
import { TipoReclamoController } from './tipo_reclamo.controller';
import { TipoReclamoService } from './tipo_reclamo.service';

describe('TipoReclamoController', () => {
  let controller: TipoReclamoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoReclamoController],
      providers: [TipoReclamoService],
    }).compile();

    controller = module.get<TipoReclamoController>(TipoReclamoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
