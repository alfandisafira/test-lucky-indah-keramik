import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DashboardStats } from './interface/dashboard-stats.interface';

@Injectable()
export class MahasiswaService {
    constructor(@Inject('DB_POOL') private pool: Pool) {}

    async getMahasiswa(){
        let response: { success : boolean; data: any[]; message: string } = {
            success: true,
            data: [],
            message: ""
        };

        let queryDataMahasiswa = 
        `
            SELECT mahasiswa.nim, mahasiswa.nama_mahasiswa, jk.deskripsi as jenis_kelamin, mahasiswa.jurusan, ipk
            FROM mahasiswa
            JOIN jenis_kelamin as jk on mahasiswa.kd_jenis_kelamin = jk.kd_jenis_kelamin
            ORDER BY nim ASC
        `;

        try {
            const result = await this.pool.query(queryDataMahasiswa);

            response.data = result.rows;
        } catch (error) {
            console.log(error.message);

            response.success = false;
            response.success = error.message;
        }

        return response;
    }

    async getMahasiswaSummary(){
        let response: { success : boolean; data: DashboardStats; message: string } = {
            success: true,
            data: {
                total: 0,
                gender: {
                    laki_laki: 0,
                    perempuan: 0
                },
                jurusan: {
                    ak: 0,
                    ti: 0
                },
                rata_rata_ipk: 0
            },
            message: ""
        };

        let queryCountTotal = 
        `
            SELECT count(*) as total
            FROM mahasiswa
        `;

        let queryCountByGender = 
        `
            SELECT jk.kd_jenis_kelamin as kd, count(mahasiswa.kd_jenis_kelamin) as jumlah
            FROM mahasiswa
            JOIN jenis_kelamin as jk on mahasiswa.kd_jenis_kelamin = jk.kd_jenis_kelamin
            GROUP BY jk.kd_jenis_kelamin
        `;

        let queryCountByJurusan =
        `
            SELECT mahasiswa.jurusan as jurusan, count(mahasiswa.jurusan) as jumlah
            FROM mahasiswa
            GROUP BY mahasiswa.jurusan
        `;

        let queryAverageIpk = 
        `
            SELECT (sum(ipk) / count(*))::NUMERIC(3,2) as rata_rata_ipk
            FROM mahasiswa
        `;

        try {
            const resultTotal = await this.pool.query(queryCountTotal);
            const resultGender = await this.pool.query(queryCountByGender);
            const resultJurusan = await this.pool.query(queryCountByJurusan);
            const resultIpk = await this.pool.query(queryAverageIpk);

            response.data.total = resultTotal.rows[0].total;

            const rowsLakiLaki = resultGender.rows.filter(row => row.kd === 'L');
            response.data.gender.laki_laki = rowsLakiLaki[0].jumlah;

            const rowsPerempuan = resultGender.rows.filter(row => row.kd === 'P');
            response.data.gender.perempuan = rowsPerempuan[0].jumlah;

            const rowsAk = resultJurusan.rows.filter(row => row.jurusan === 'AK');
            response.data.jurusan.ak = rowsAk[0].jumlah;

            const rowsTi = resultJurusan.rows.filter(row => row.jurusan === 'TI');
            response.data.jurusan.ti = rowsTi[0].jumlah;

            response.data.rata_rata_ipk = resultIpk.rows[0].rata_rata_ipk;
        } catch (error) {
            console.log(error.message);

            response.success = false;
            response.success = error.message;
        }

        return response;
    }
}
