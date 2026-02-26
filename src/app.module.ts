import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/database/databasel.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { ExcelService } from './excel/excel.service';
import { ExcelController } from './excel/excel.controller';
import { MahasiswaService } from './mahasiswa/mahasiswa.service';

@Module({
  imports: [MahasiswaModule, DatabaseModule],
  controllers: [AppController, ExcelController],
  providers: [AppService, MahasiswaService, ExcelService],
})
export class AppModule {}
