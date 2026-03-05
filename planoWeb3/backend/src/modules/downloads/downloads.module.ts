import { Module } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadsController } from './downloads.controller';

@Module({
  controllers: [DownloadsController],
  providers: [DownloadsService]
})
export class DownloadsModule {}
