import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/database/databasel.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';

@Module({
  imports: [MahasiswaModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
