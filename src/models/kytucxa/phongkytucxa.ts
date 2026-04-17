import useInitModel from '@/hooks/useInitModel';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import axios from '@/utils/axios';
import { ipCsvc } from '@/utils/ip';
import { message } from 'antd';

export default () => {
	const objInit = useInitModel<KyTucXa.IPhongKyTucXa>('phong/ktx', undefined, undefined, ipCsvc);

	const getModel: typeof objInit.getModel = async (
		paramCondition,
		filterParams,
		sortParam,
		paramPage,
		paramLimit,
		path,
		otherQuery,
		isSetDanhSach,
		isAbsolutePath,
		selectParams,
		config,
	) => {
		return objInit.getModel(
			paramCondition,
			filterParams,
			sortParam,
			paramPage,
			paramLimit,
			path || 'phong/ktx', // Use explicit path
			otherQuery,
			isSetDanhSach,
			isAbsolutePath !== undefined ? isAbsolutePath : !path, // Activate absolute path fallback
			selectParams,
			config,
		);
	};

	const getAllModel: typeof objInit.getAllModel = async (
		isSetRecord,
		sortParam,
		conditionParam,
		filterParam,
		pathParam,
		isSetDanhSach,
		selectParams,
		otherQuery,
		config,
	) => {
		objInit.setLoading(true);
		try {
			const payload = {
				condition: conditionParam,
				sort: sortParam,
				filters: filterParam,
				select: selectParams?.join(' '),
				...(otherQuery ?? {}),
			};
			const response = await objInit.getService(
				payload as any,
				pathParam || 'phong/ktx',
				!pathParam,
				config?.dataPartitionCode ? { 'x-data-partition-code': config.dataPartitionCode } : undefined,
			);
			const data = response?.data?.data ?? [];
			if (isSetDanhSach !== false) objInit.setDanhSach(data);
			if (isSetRecord) objInit.setRecord(data?.[0]);

			return data;
		} catch (er) {
			if (isSetDanhSach !== false) {
				objInit.setDanhSach([]);
				objInit.setTotal(0);
			}
			return Promise.reject(er);
		} finally {
			objInit.setLoading(false);
		}
	};

	const postModel: typeof objInit.postModel = async (
		payload,
		getData,
		closeModal,
		messageText,
		config,
	) => {
		if (objInit.formSubmiting) return Promise.reject('Form submiting');
		objInit.setFormSubmiting(true);
		try {
			// POST lên endpoint 'phong' thay vì 'phong/ktx' gốc
			// Ép thêm cờ isKyTucXa = true để backend biết đây là phòng KTX
			const res = await axios.post(
				`${ipCsvc}/phong`,
				{ ...payload, isKyTucXa: true },
				{
					headers: config?.dataPartitionCode ? { 'x-data-partition-code': config.dataPartitionCode } : undefined,
				},
			);
			message.success(messageText ?? 'Thêm mới thành công');
			objInit.setLoading(false);
			if (getData) getData();
			else getModel(); // Gọi lại getModel đã override ở trên
			if (closeModal !== false) objInit.setVisibleForm(false);

			return res.data?.data;
		} catch (err) {
			return Promise.reject(err);
		} finally {
			objInit.setFormSubmiting(false);
		}
	};

	return {
		...objInit,
		getModel,
		getAllModel,
		postModel,
	};
};
