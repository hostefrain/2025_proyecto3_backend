import { Test, TestingModule } from '@nestjs/testing';
import { NivelCriticidadService } from './nivel_criticidad.service';

describe('NivelCriticidadService', () => {
  let service: NivelCriticidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NivelCriticidadService],
    }).compile();

    service = module.get<NivelCriticidadService>(NivelCriticidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
