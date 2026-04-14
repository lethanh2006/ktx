import useInitModel from '@/hooks/useInitModel';
import { closeBillSinhVienKtx, duyetSinhVienKTX } from '@/services/KyTucXa/index';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import { ipSlink } from '@/utils/ip';
import { message } from 'antd';

export default () => {
	const objInit = useInitModel<KyTucXa.ISinhVienDot>('sinh-vien-dang-ky-ktx', undefined, undefined, ipSlink);
	const { formSubmiting, setFormSubmiting } = objInit;

	const duyetSinhVienKTXModel = async (
		idDot: string,
		payLoad: Partial<KyTucXa.TDuyetSinhVienKTX>,
	): Promise<KyTucXa.ISinhVienDot> => {
		if (formSubmiting) return Promise.reject('form submiting');
		setFormSubmiting(true);

		try {
			const res = await duyetSinhVienKTX(idDot, payLoad);
			message.success('Lưu thành công');
			return res.data?.data;
		} catch (err) {
			return Promise.reject(err);
		} finally {
			setFormSubmiting(false);
		}
	};

	const resetBillModel = async (idSinhVienKTX: string): Promise<KyTucXa.ISinhVienDot> => {
		if (formSubmiting) return Promise.reject('form submiting');
		setFormSubmiting(true);

		try {
			const res = await closeBillSinhVienKtx(idSinhVienKTX);
			message.success('Đã hủy công nợ');
			return res.data?.data;
		} catch (err) {
			return Promise.reject(err);
		} finally {
			setFormSubmiting(false);
		}
	};

	return {
		...objInit,
		duyetSinhVienKTXModel,
		resetBillModel,
	};
};
