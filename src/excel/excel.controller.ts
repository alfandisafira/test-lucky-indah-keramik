// excel.controller.ts
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ExcelService } from './excel.service';
import { MahasiswaService } from 'src/mahasiswa/mahasiswa.service';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';
import * as fs from 'fs';

@Controller('api/excel')
export class ExcelController {
  constructor(
    private readonly excelService: ExcelService,
    private readonly mahasiswaService: MahasiswaService,
    private readonly whatsappService: WhatsappService,
) {}

  @Get('export')
  async export(@Res() res: Response) {
    const response: { success : boolean; data: any[]; message: string } = await this.mahasiswaService.getMahasiswa();

    const { data } = response;

    await this.excelService.exportToExcel(data, res);
  }

  @Get('wa-status')
  getWaStatus() {
    return this.whatsappService.getStatus();
  }

  @Post('send-wa')
  async sendToWhatsapp(@Body() body: { phone: string }) {
    const status = this.whatsappService.getStatus();

    if (!status.is_ready) {
      return {
        success: false,
        need_scan: true,
        qr: status.qr,
      };
    }

    const response: { success : boolean; data: any[]; message: string } = await this.mahasiswaService.getMahasiswa();

    const { data } = response;

    const filePath = await this.excelService.generateExcelFile(data, 'data_mahasiswa.xlsx');

    await this.whatsappService.sendExcel(body.phone, filePath, '📊 Berikut Laporan Data Mahasiswa');

    fs.unlinkSync(filePath);

    return { message: 'File berhasil dikirim ke WhatsApp!' };
  }

  @Post('wa-logout')
  async logout() {
    await this.whatsappService.logout();
    return { message: 'Berhasil logout dari WhatsApp' };
  }
}