import { EOperatorType } from '@/components/Table/constant';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect } from 'react';
import { useModel } from 'umi';

const RoomTable: React.FC<{
	toaNhaIds?: string[];
	selectedRowKeys?: React.Key[];
	onChangeSelectedKeys?: (keys: string[], rows: any[]) => void;
}> = ({ toaNhaIds, selectedRowKeys = [], onChangeSelectedKeys }) => {
	const { danhSach: rooms, getAllModel, loading } = useModel('theodoitaisanvattu.phong');

	useEffect(() => {
		const filters = toaNhaIds?.length
			? [
					{
						field: 'maToaNha',
						values: toaNhaIds,
						operator: EOperatorType.INCLUDE,
					},
				]
			: [];

		getAllModel(false, undefined, undefined, filters as any).catch(() => {});
	}, [JSON.stringify(toaNhaIds)]);

	const columns: ColumnsType<any> = [
		{
			title: 'Tên phòng',
			dataIndex: 'ten',
			key: 'ten',
			width: 180,
		},
		{
			title: 'Tòa nhà',
			dataIndex: ['toaNha', 'ten'],
			key: 'toaNha',
			width: 180,
			render: (_: any, rec: any) => rec?.toaNha?.ten || rec?.maToaNha || '-',
		},
		{
			title: 'Tầng thứ',
			dataIndex: 'tangThu',
			key: 'tangThu',
			width: 100,
			render: (val: any) => val ?? '-',
		},
		{
			title: 'Diện tích',
			dataIndex: 'dienTich',
			key: 'dienTich',
			width: 110,
			render: (val: any) => val ?? '-',
		},
		{
			title: 'Số lượng tối đa',
			dataIndex: 'soLuongToiDa',
			key: 'soLuongToiDa',
			width: 120,
			render: (val: any) => val ?? '-',
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: (keys: React.Key[], rows: any[]) => onChangeSelectedKeys?.(keys.map(String), rows),
	};

	return (
		<div className='room-table-no-checkbox-effect'>
			<Table
				rowKey={(rec) => rec.ma}
				columns={columns}
				dataSource={rooms}
				loading={loading}
				rowSelection={rowSelection}
				pagination={{ pageSize: 10 }}
			/>
		</div>
	);
};

export default RoomTable;
