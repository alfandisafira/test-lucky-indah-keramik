// excel.service.ts
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ExcelService {
  async generateExcelFile(data: any[], filename = 'data_mahasiswa.xlsx'): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Data_Mahasiswa');

    sheet.columns = [
      { header: 'NIM', key: 'nim', width: 20},
      { header: 'Nama', key: 'nama_mahasiswa', width: 20 },
      { header: 'Jenis Kelamin', key: 'jenis_kelamin', width: 20 },
      { header: 'Kode Jurusan', key: 'jurusan', width: 20 },
      { header: 'IPK', key: 'ipk', width: 10, style: { alignment: { horizontal: 'right' } } },
    ];

    sheet.getRow(1).font = { bold: true };

    sheet.getRow(1).eachCell((cell) => {
        cell.alignment = { horizontal: 'left' }
    })

    sheet.addRows(data);

    const dir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const filePath = path.join(dir, filename);
    await workbook.xlsx.writeFile(filePath);

    return filePath;
  }

  async exportToExcel(data: any[], res: Response): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Data_Mahasiswa');

    sheet.columns = [
      { header: 'NIM', key: 'nim', width: 20},
      { header: 'Nama', key: 'nama_mahasiswa', width: 20 },
      { header: 'Jenis Kelamin', key: 'jenis_kelamin', width: 20 },
      { header: 'Kode Jurusan', key: 'jurusan', width: 20 },
      { header: 'IPK', key: 'ipk', width: 10, style: { alignment: { horizontal: 'right' } } },
    ];

    sheet.getRow(1).font = { bold: true };

    sheet.getRow(1).eachCell((cell) => {
        cell.alignment = { horizontal: 'left' }
    })

    sheet.addRows(data);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=data_mahasiswa.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }
}