import ExpandText from '@/components/ExpandText';
import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useIntl, useModel } from 'umi';
import Form from './components/Form';

const ToaKyTucXaPage = () => {
	const intl = useIntl();
	const { getModel, page, limit, deleteModel, handleEdit } = useModel('kytucxa.toakytucxa');

	const columns: IColumn<KyTucXa.IToaNhaKyTucXa>[] = [
		{
			title: 'Mã tòa',
			dataIndex: 'ma',
			width: 100,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Tên tòa',
			dataIndex: 'ten',
			width: 150,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'diaChi',
			width: 180,
			filterType: 'string',
			sortable: true,
			render: (val, rec) => <ExpandText>{val}</ExpandText>,
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
			modelName='kytucxa.toakytucxa'
			title={intl.formatMessage({ id: 'kytucxa.toakytucxa.title' })}
			Form={Form}
			rowSelection
			deleteMany
			buttons={{ import: true, export: true }}
		/>
	);
};

export default ToaKyTucXaPage;
