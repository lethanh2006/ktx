import { Select } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'umi';

/**
 * Secect Căn cứ pháp lý để cho vào FormItem
 */
const SelectPhongKyTucXa = (props: {
	value?: string;
	onChange?: (id: string) => void;
	multiple?: boolean;
	condition?: any;
	allowClear?: boolean;
	style?: React.CSSProperties;
	isSetRecord?: boolean;
	selectMa?: boolean;
}) => {
	const { value, onChange, multiple, condition, allowClear, style, isSetRecord } = props;
	const { danhSach, getAllModel, setRecord, loading } = useModel('kytucxa.phongkytucxa');

	useEffect(() => {
		getAllModel(isSetRecord, undefined, condition).then(() => {
			if (!isSetRecord) setRecord(undefined);
		});
	}, [JSON.stringify(condition)]);

	return (
		<Select
			mode={multiple ? 'multiple' : undefined}
			value={value}
			onChange={onChange}
			options={danhSach.map((item) => ({
				key: item._id,
				value: item.ma,
				label: `${item.ma} - ${item.toaNha?.ten ?? ''}`,
			}))}
			showSearch
			optionFilterProp='label'
			placeholder='Chọn phòng ký túc xá'
			allowClear={allowClear ?? false}
			style={{ width: '100%', ...style }}
			showArrow
			loading={loading}
		/>
	);
};

export default SelectPhongKyTucXa;
