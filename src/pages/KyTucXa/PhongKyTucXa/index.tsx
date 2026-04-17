import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useIntl, useModel } from 'umi';
import Form from './components/Form';

const PhongKyTucXaPage = () => {
	const intl = useIntl();
	const { getModel, page, limit, deleteModel, handleEdit } = useModel('kytucxa.phongkytucxa');

	const columns: IColumn<KyTucXa.IPhongKyTucXa>[] = [
		{
			title: 'Mã phòng',
			dataIndex: 'ma',
			width: 100,
			sortable: true,
			filterType: 'string',
		},
		{
			title: 'Tên phòng',
			dataIndex: 'ten',
			width: 150,
			sortable: true,
		},
		{
			title: 'Tòa nhà',
			dataIndex: 'maToaNha',
			width: 120,
		},
		{
			title: 'Sức chứa',
			dataIndex: 'soLuongToiDa',
			align: 'center',
			width: 100,
		},
		{
			title: 'Đang ở',
			dataIndex: 'soLuongHienTai',
			align: 'center',
			width: 100,
		},
		{
			title: 'Giới tính',
			dataIndex: 'maGioiTinh',
			align: 'center',
			width: 100,
		},
		{
			title: 'Mã thu phòng',
			dataIndex: 'maKhoanThuPhong',
			width: 130,
		},
		{
			title: 'Mã thu cọc',
			dataIndex: 'maKhoanThuCoc',
			width: 130,
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
							title='Bạn có chắc chắn muốn xóa phòng ký túc xá này?'
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
			modelName='kytucxa.phongkytucxa'
			title={intl.formatMessage({ id: 'kytucxa.phongkytucxa.title' })}
			Form={Form}
			rowSelection
			deleteMany
			buttons={{ import: true, export: true }}
		/>
	);
};

export default PhongKyTucXaPage;
