import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { ETrangThaiDotDangKyKTX, colorTrangThaiDotDangKyKTX } from '@/services/KyTucXa/constant';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { useIntl, useModel } from 'umi';
import Form from './components/Form';

const DotDangKyPage = () => {
    const intl = useIntl();
	const { getModel, page, limit, deleteModel, handleEdit } = useModel('kytucxa.dotdangkyktx');

	const columns: IColumn<KyTucXa.DotKyTucXa>[] = [
		{
			title: 'Tên đợt',
			dataIndex: 'tenDot',
			width: 200,
			filterType: 'string',
		},
		{
			title: 'Mã học kỳ',
			dataIndex: 'maHocKy',
			width: 120,
			filterType: 'string',
		},
		{
			title: 'Tên học kỳ',
			dataIndex: 'tenHocKy',
			width: 150,
			filterType: 'string',
		},
		{
			title: 'Ngày bắt đầu',
			dataIndex: 'ngayBatDau',
			width: 150,
			align: 'center',
            render: (val) => val && moment(val).format('DD/MM/YYYY HH:mm'),
		},
		{
			title: 'Ngày kết thúc',
			dataIndex: 'ngayKetThuc',
			width: 150,
			align: 'center',
            render: (val) => val && moment(val).format('DD/MM/YYYY HH:mm'),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			width: 150,
			align: 'center',
			filterType: 'select',
			filterData: Object.values(ETrangThaiDotDangKyKTX),
			render: (val: ETrangThaiDotDangKyKTX) =>
				val && <Tag color={colorTrangThaiDotDangKyKTX[val]}>{val}</Tag>,
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
							title='Bạn có chắc chắn muốn xóa đợt đăng ký này?'
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
			modelName='kytucxa.dotdangkyktx'
			title={intl.formatMessage({ id: 'kytucxa.dotdangky.title' })}
			Form={Form}
			rowSelection
			deleteMany
			buttons={{ import: true, export: true }}
		/>
	);
};

export default DotDangKyPage;