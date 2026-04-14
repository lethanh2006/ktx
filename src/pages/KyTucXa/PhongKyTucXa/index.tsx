import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { ETrangThaiPhong } from '@/services/KyTucXa/constant';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tag, Tooltip } from 'antd';
import { useIntl, useModel } from 'umi';
import SelectToaKyTucXa from '../ToaKyTucXa/components/Select';
import Form from './components/Form';

const PhongKyTucXaPage = () => {
	const intl = useIntl();
	const { getModel, page, limit, deleteModel, handleEdit } = useModel('kytucxa.phongkytucxa');

	const columns: IColumn<KyTucXa.IPhongKyTucXa>[] = [
		{
			title: 'Tòa nhà',
			dataIndex: 'maToaNha',
			width: 150,
			filterType: 'customselect',
			filterCustomSelect: <SelectToaKyTucXa selectMa multiple />,
			render: (val, rec) => rec.toaNha?.ten ?? val,
		},
		{
			title: 'Mã phòng',
			dataIndex: 'ma',
			width: 100,
			sortable: true,
			filterType: 'string',
		},
		{
			title: 'Số lượng tối đa',
			dataIndex: 'soGiuong',
			align: 'center',
			width: 100,
			sortable: true,
		},
		{
			title: 'Tầng thứ',
			dataIndex: 'soTang',
			width: 100,
			sortable: true,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			width: 100,
			align: 'center',
			filterType: 'select',
			filterData: Object.values(ETrangThaiPhong),
			render: (val: ETrangThaiPhong) =>
				val && <Tag color={val === ETrangThaiPhong.BAO_TRI ? 'orange' : 'green'}>{val}</Tag>,
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
							title='Bạn có chắc chắn muốn xóa tòa ký túc xá này?'
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
