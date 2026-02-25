import { Controller, Get, Render } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';

@Controller('api/mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  @Get()
  getMahasiswa() {
    return this.mahasiswaService.getMahasiswa();
  }

  @Get('summary')
  getSummaryMahasiswa() {
    return this.mahasiswaService.getMahasiswaSummary();
  }
}
