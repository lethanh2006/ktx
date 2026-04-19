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

export enum EGioiTinh {
	NAM = 'Nam',
	NU = 'Nữ',
}

export enum ELoaiKhoanThu {
	KTX = 'KTX',
}

export enum ERuleType {
	GIOI_TINH = 'GIOI_TINH',
	MAX_PER_KHOA = 'MAX_PER_KHOA',
	MIN_AGE = 'MIN_AGE',
	MAX_AGE = 'MAX_AGE',
}

export const transRuleType: Record<ERuleType, string> = {
	[ERuleType.GIOI_TINH]: 'Giới tính',
	[ERuleType.MAX_PER_KHOA]: 'Giới hạn mỗi khoa',
	[ERuleType.MIN_AGE]: 'Tuổi tối thiểu',
	[ERuleType.MAX_AGE]: 'Tuổi tối đa',
};
