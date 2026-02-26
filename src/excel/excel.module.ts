import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';
import { MahasiswaService } from 'src/mahasiswa/mahasiswa.service';

@Module({
  controllers: [ExcelController],
  providers: [ExcelService, WhatsappService, MahasiswaService],
})
export class ExcelModule {}
