import { Image, Modal, Popover, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';

const RoomTable: React.FC<{ toaNhaId?: string | null }> = ({ toaNhaId }) => {
	const { danhSach: rooms, getAllModel, loading } = useModel('theodoitaisanvattu.phong');
	const [visibleModal, setVisibleModal] = useState(false);
	const [modalImages, setModalImages] = useState<string[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	useEffect(() => {
		const cond = toaNhaId ? { maToaNha: toaNhaId } : undefined;
		getAllModel(false, undefined, cond as any).catch(() => {});
	}, [toaNhaId]);

	const openImages = (images?: string[]) => {
		setModalImages(images ?? []);
		setVisibleModal(true);
	};

	const columns: ColumnsType<any> = [
		{
			title: 'Ảnh',
			dataIndex: 'danhSachAnh',
			key: 'thumb',
			width: 80,
			render: (imgs: string[]) => {
				const src = imgs?.[0];
				const thumb = src ? (
					<img
						src={src}
						alt='thumb'
						style={{ width: 48, height: 48, objectFit: 'cover', cursor: 'pointer', borderRadius: 4 }}
						onClick={() => openImages(imgs)}
					/>
				) : (
					<div style={{ width: 48, height: 48, background: '#f0f0f0', borderRadius: 4 }} />
				);

				return (
					<Popover content={<img src={src} style={{ maxWidth: 240 }} />} trigger='hover'>
						{thumb}
					</Popover>
				);
			},
		},
		{
			title: 'Tên phòng',
			dataIndex: 'ten',
			key: 'ten',
		},
		{
			title: 'Tòa nhà',
			dataIndex: ['toaNha', 'ten'],
			key: 'toaNha',
			render: (_: any, rec: any) => rec?.toaNha?.ten || rec?.maToaNha || '-',
		},
		{
			title: 'Mã',
			dataIndex: 'ma',
			key: 'ma',
		},
		{
			title: 'Diện tích',
			dataIndex: 'dienTich',
			key: 'dienTich',
		},
		{
			title: 'Số lượng tối đa',
			dataIndex: 'soLuongToiDa',
			key: 'soLuongToiDa',
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
	};

	return (
		<div>
			<Table
				rowKey={(rec) => rec._id}
				columns={columns}
				dataSource={rooms}
				loading={loading}
				rowSelection={rowSelection}
				pagination={{ pageSize: 10 }}
			/>

			<Modal visible={visibleModal} footer={null} onCancel={() => setVisibleModal(false)} width={800}>
				{modalImages?.length ? (
					<Image.PreviewGroup>
						{modalImages.map((src, idx) => (
							<Image src={src} key={idx} style={{ maxHeight: '70vh', objectFit: 'contain' }} />
						))}
					</Image.PreviewGroup>
				) : (
					<div>Không có ảnh</div>
				)}
			</Modal>
		</div>
	);
};

export default RoomTable;
