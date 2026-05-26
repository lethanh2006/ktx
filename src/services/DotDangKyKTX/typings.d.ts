declare module DotDangKyKTX {
    export interface IRecord {
        _id: string;
        tenDot: string;
        maHocKy: string;
        thoiGianBatDau: string;
        thoiGianKetThuc: string;
        maKhoaNganh: string[];
        phongTheoToaNha?: {
            maToaNha: string;
            dsPhong: string[];
        }[];
        ghiChu: string;
        soLuongDon: number;
    }
}