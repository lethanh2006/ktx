import type { ETrangThaiDotDangKyKTX, ETrangThaiPhong, ETrangThaiSinhVienKTX, EGioiTinh, ELoaiKhoanThu, ERuleType } from './constant';

declare module KyTucXa {
	export interface IToaNhaKyTucXa {
		_id: string;
		ma: string;
		ten: string;
		diaChi: string;
	}

	export interface IPhongKyTucXa {
		_id: string;
		ma: string;
		ten?: string;

		maGioiTinh?: EGioiTinh | string;
		soLuongToiDa?: number;
		soLuongHienTai?: number;
		cachBoTri?: string;
		maKhoanThuPhong?: string;
		maKhoanThuCoc?: string;
		danhSachTienIch?: { ten: string; moTa?: string }[];
		moTa?: string;
		danhSachAnh?: string[];
		maToaNha?: string;
	}

	export interface IKhoanThuKTX {
		_id: string;
		maNamHoc: string;
		ten: string;
		loai: ELoaiKhoanThu;
		maDoiTuong: string;
		unitLabel: string;
		maMucThu: string;
		tenMucThu: string;
		unitAmount: number;
		currency: string;
		cauHinh: {
			loaiDinhKy: ELoaiDinhKy;
		};
	}

	export interface IDangKyThueRule {
		_id: string;
		ma: string;
		ten: string;
		loai: ERuleType;
		stt?: number;
		maToaNha?: string;
		maPhong?: string;
		isActive: boolean;
		noiDungLyDo?: string;
		giaTri: IDangKyThueRuleGiaTri;
	}

	export type IDangKyThueRuleGiaTri =
		| { gioiTinh: EGioiTinh }
		| { maxPerKhoa: number }
		| { minAge: number }
		| { maxAge: number }
		| Record<string, never>;
}
