import type { ETrangThaiDotDangKyKTX, ETrangThaiPhong, ETrangThaiSinhVienKTX } from './constant';

declare module KyTucXa {
	export interface DotKyTucXa {
		_id: string;
		tenDot: string;
		ngayBatDau: Date;
		ngayKetThuc: Date;
		maHocKy: string;
		hocKy?: HocKy.IRecord;
		tenHocKy: string;
		trangThai: ETrangThaiDotDangKyKTX;
		ghiChu: string;

		idDotThu?: string;
	}

	export interface ISinhVienDot {
		_id: string;
		idDotDangKy: string;
		sinhVienSsoId: string;
		maSinhVien: string;
		tenSinhVien: string;
		tenLopHanhChinh: string;
		soDienThoai: string;

		thoiGianBatDau?: Date;
		thoiGianKetThuc?: Date;
		// maPhongHienTai: string;
		maPhongDangKy?: string;
		phongKTX?: PhongKyTucXa.IRecord;
		trangThaiDuyet: ETrangThaiSinhVienKTX;
		ghiChu?: string;

		trangThaiThanhToan?: ETrangThaiThanhToan;
		billIdentityCode?: string;
	}

	export type TDuyetSinhVienKTX = {
		dangSachSinhVienDangKyId: string[];
		maPhongDangKy: string;
		thoiGianBatDau: Date;
		thoiGianKetThuc: Date;
		trangThaiDuyet: ETrangThaiSinhVienKTX;
	};

	export interface IToaNhaKyTucXa {
		_id: string;
		ma: string;
		ten: string;
		diaChi: string;
	}

	export interface IPhongKyTucXa {
		_id: string;
		ma: string;
		soGiuong: number;
		soTang: number;
		maToaNha: string;
		toaNha?: IToaNha;
		trangThai: ETrangThaiPhong;
	}
}
