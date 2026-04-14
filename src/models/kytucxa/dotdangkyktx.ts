import useInitModel from '@/hooks/useInitModel';
import { chotDotDangKyKTX } from '@/services/KyTucXa/index';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import { ipSlink } from '@/utils/ip';
import { message } from 'antd';

export default () => {
	const objInit = useInitModel<KyTucXa.DotKyTucXa>('dot-dang-ky-ktx', undefined, undefined, ipSlink);
	const { setFormSubmiting, formSubmiting } = objInit;

	const chotDotDangKyModel = async (idDot: string): Promise<unknown> => {
		if (formSubmiting) return Promise.reject('form submiting');
		setFormSubmiting(true);
		try {
			const res = await chotDotDangKyKTX(idDot);
			message.success('Đã chốt thành công');
			return res.data?.data;
		} catch (error) {
			return Promise.reject(error);
		} finally {
			setFormSubmiting(false);
		}
	};

	return {
		...objInit,
		chotDotDangKyModel,
	};
};
