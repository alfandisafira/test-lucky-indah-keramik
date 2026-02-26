// excel.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ExcelService } from './excel.service';
import { MahasiswaService } from 'src/mahasiswa/mahasiswa.service';

@Controller('api/excel')
export class ExcelController {
  constructor(
    private readonly excelService: ExcelService,
    private readonly mahasiswaService: MahasiswaService
) {}

  @Get('export')
  async export(@Res() res: Response) {
    const response: { success : boolean; data: any[]; message: string } = await this.mahasiswaService.getMahasiswa();

    const { data } = response;

    await this.excelService.exportToExcel(data, res);
  }
}