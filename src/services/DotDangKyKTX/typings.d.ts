declare module DotDangKyKTX {
    export interface IRecord {
        _id: string;
        tenDot: string;
        maHocKy: string;
        thoiGianBatDau: string;
        thoiGianKetThuc: string;
        maKhoaNganh: string[];
        danhSachToaNha: string[]
        danhSachPhong: string[]
        ghiChu: string;
        soLuongDon: number;
    }
}