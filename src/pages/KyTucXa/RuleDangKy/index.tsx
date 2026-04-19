import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { ERuleType, transRuleType } from '@/services/KyTucXa/constant';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Switch, Tag, Tooltip } from 'antd';
import { useModel } from 'umi';
import Form from './components/Form';

const RuleDangKyPage = () => {
	const { getModel, page, limit, deleteModel, handleEdit, putModel } = useModel('kytucxa.dangkythuerule');

	const colorLoai: Record<ERuleType, string> = {
		[ERuleType.GIOI_TINH]: 'blue',
		[ERuleType.MAX_PER_KHOA]: 'purple',
		[ERuleType.MIN_AGE]: 'orange',
		[ERuleType.MAX_AGE]: 'volcano',
	};

	const columns: IColumn<KyTucXa.IDangKyThueRule>[] = [
		{
			title: 'STT',
			dataIndex: 'stt',
			width: 60,
			align: 'center',
			sortable: true,
		},
		{
			title: 'Mã rule',
			dataIndex: 'ma',
			width: 180,
			filterType: 'string',
		},
		{
			title: 'Tên rule',
			width: 200,
			dataIndex: 'ten',
			filterType: 'string',
		},
		{
			title: 'Loại',
			dataIndex: 'loai',
			width: 160,
			filterType: 'select',
			filterData: Object.values(ERuleType),
			render: (val: ERuleType) =>
				val && <Tag color={colorLoai[val]}>{transRuleType[val] ?? val}</Tag>,
		},
		{
			title: 'Tòa áp dụng',
			dataIndex: 'maToaNha',
			width: 120,
		},
		{
			title: 'Phòng áp dụng',
			dataIndex: 'maPhong',
			width: 130,
		},
		{
			title: 'Giá trị',
			dataIndex: 'giaTri',
			width: 160,
			render: (val: any, record) => {
				if (!val) return '—';
				if (record.loai === ERuleType.GIOI_TINH) return val.gioiTinh;
				if (record.loai === ERuleType.MAX_PER_KHOA) return `Max ${val.maxPerKhoa} SV/khoa`;
				if (record.loai === ERuleType.MIN_AGE) return `Tuổi ≥ ${val.minAge}`;
				if (record.loai === ERuleType.MAX_AGE) return `Tuổi ≤ ${val.maxAge}`;
				return JSON.stringify(val);
			},
		},
		{
			title: 'Kích hoạt',
			dataIndex: 'isActive',
			width: 90,
			align: 'center',
			render: (val: boolean, record) => (
				<Switch
					checked={val}
					size='small'
					onChange={(checked) =>
						putModel(record._id, { isActive: checked } as any, getModel, true)
					}
				/>
			),
		},
		{
			title: 'Thao tác',
			align: 'center',
			width: 90,
			fixed: 'right',
			render: (val, record) => (
				<>
					<Tooltip title='Chỉnh sửa'>
						<Button onClick={() => handleEdit(record)} type='link' icon={<EditOutlined />} />
					</Tooltip>
					<Tooltip title='Xóa'>
						<Popconfirm
							onConfirm={() => deleteModel(record._id, getModel)}
							title='Bạn có chắc chắn muốn xóa rule này?'
							placement='topRight'
						>
							<Button danger type='link' icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</>
			),
		},
	];

	return (
		<TableBase
			columns={columns}
			dependencies={[page, limit]}
			modelName='kytucxa.dangkythuerule'
			title='Cấu hình Rule đăng ký KTX'
			Form={Form}
			rowSelection
			deleteMany
		/>
	);
};

export default RuleDangKyPage;
