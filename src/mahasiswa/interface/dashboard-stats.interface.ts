export interface GenderStats {
  laki_laki: number;
  perempuan: number;
}

export interface JurusanStats {
  ak: number;
  ti: number;
}

export interface DashboardStats {
  total: number;
  gender: GenderStats;
  jurusan: JurusanStats;
  rata_rata_ipk: number;
}