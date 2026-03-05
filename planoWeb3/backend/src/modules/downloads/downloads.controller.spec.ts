import { Test, TestingModule } from '@nestjs/testing';
import { DownloadsController } from './downloads.controller';

describe('DownloadsController', () => {
  let controller: DownloadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadsController],
    }).compile();

    controller = module.get<DownloadsController>(DownloadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
