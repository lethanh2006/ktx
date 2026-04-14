export enum ETrangThaiDotDangKyKTX {
	CHO_XU_LY = 'Chờ xử lý',
	YEU_CAU_CHINH_SUA = 'Yêu cầu chỉnh sửa',
	DA_BAN_HANH = 'Đã ban hành',
}

export const colorTrangThaiDotDangKyKTX: Record<ETrangThaiDotDangKyKTX, string> = {
	[ETrangThaiDotDangKyKTX.CHO_XU_LY]: 'blue',
	[ETrangThaiDotDangKyKTX.YEU_CAU_CHINH_SUA]: 'orange',
	[ETrangThaiDotDangKyKTX.DA_BAN_HANH]: 'green',
};

export enum ETrangThaiSinhVienKTX {
	CHUA_DUYET = 'CHUA_DUYET',
	DA_DUYET = 'DA_DUYET',
	KHONG_DUYET = 'KHONG_DUYET',
}

export const transTrangThaiSinhVienKTX: Record<ETrangThaiSinhVienKTX, string> = {
	[ETrangThaiSinhVienKTX.CHUA_DUYET]: 'Chưa duyệt',
	[ETrangThaiSinhVienKTX.DA_DUYET]: 'Đã duyệt',
	[ETrangThaiSinhVienKTX.KHONG_DUYET]: 'Không duyệt',
};

export const colorTrangThaiSinhVienKTX: Record<ETrangThaiSinhVienKTX, string> = {
	[ETrangThaiSinhVienKTX.CHUA_DUYET]: 'blue',
	[ETrangThaiSinhVienKTX.DA_DUYET]: 'green',
	[ETrangThaiSinhVienKTX.KHONG_DUYET]: 'orange',
};

export enum ETrangThaiPhong {
	HOAT_DONG = 'Hoạt động',
	BAO_TRI = 'Bảo trì',
	HONG = 'Hỏng',
}