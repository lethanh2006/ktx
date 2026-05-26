import MyDatePicker from '@/components/MyDatePicker';
import FormItemKhoaNganh from '@/pages/DaoTaoV2/KhoaNganhDotDangKy/FormItemKhoaNganh';
import SelectHocKy from '@/pages/HocKy/components/SelectHocKy';
import RoomTable from '@/pages/KyTucXa/components/RoomTable';
import SelectToaNha from '@/pages/KyTucXa/components/SelectToaNha';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

const FormDotDangKyKTX = () => {
	const [form] = Form.useForm();
	const { record, visibleForm, edit, setVisibleForm, putModel, postModel, formSubmiting } = useModel('dotdangkyktx');
	const [selectedToaNhaIds, setSelectedToaNhaIds] = useState<string[]>([]);
	const [selectedPhongTheoToaNha, setSelectedPhongTheoToaNha] = useState<Record<string, string[]>>({});

	const currentSelectedPhongKeys = selectedToaNhaIds.flatMap((maToaNha) => selectedPhongTheoToaNha[maToaNha] ?? []);

	const { record: recordPhong, danhSach: danhSachPhong, getAllModel } = useModel('theodoitaisanvattu.phong');

	useEffect(() => {
		// Fetch phòng list when form becomes visible
		if (visibleForm) {
			getAllModel().catch((e) => console.log('getAllModel error', e));
		}
	}, [visibleForm]);

	useEffect(() => {
		console.log('recordPhong', recordPhong);
		console.log('danhSachPhong', danhSachPhong);
	}, [recordPhong, danhSachPhong]);

	useEffect(() => {
		if (!visibleForm) {
			resetFieldsForm(form);
			setSelectedToaNhaIds([]);
			setSelectedPhongTheoToaNha({});
			return;
		}

		if (record?._id) {
			const phongTheoToaNha = record?.phongTheoToaNha ?? [];
			const toaNhaIds = [...new Set(phongTheoToaNha.map((item) => item.maToaNha).filter(Boolean))];
			const selectedPhongMap = phongTheoToaNha.reduce<Record<string, string[]>>((acc, item) => {
				acc[item.maToaNha] = item.dsPhong ?? [];
				return acc;
			}, {});

			form.setFieldsValue({
				...record,
				maKhoaNganh: record?.maKhoaNganh ?? [],
				toaNhaIds,
			});
			setSelectedToaNhaIds(toaNhaIds);
			setSelectedPhongTheoToaNha(selectedPhongMap);
		} else {
			form.setFieldsValue({
				maKhoaNganh: [],
				toaNhaIds: [],
			});
			setSelectedToaNhaIds([]);
			setSelectedPhongTheoToaNha({});
		}
	}, [record?._id, visibleForm]);

	useEffect(() => {
		setSelectedPhongTheoToaNha((prev) => {
			const next = Object.fromEntries(
				Object.entries(prev).filter(([maToaNha]) => selectedToaNhaIds.includes(maToaNha)),
			);

			return Object.keys(next).length === Object.keys(prev).length ? prev : next;
		});
	}, [JSON.stringify(selectedToaNhaIds)]);

	const onFinish = async (values: DotDangKyKTX.IRecord) => {
		const phongTheoToaNha = Object.entries(selectedPhongTheoToaNha)
			.filter(([, dsPhong]) => dsPhong.length)
			.map(([maToaNha, dsPhong]) => ({ maToaNha, dsPhong }));
		const { toaNhaIds, ...restValues } = values as DotDangKyKTX.IRecord & { toaNhaIds?: string[] };
		const payload: Partial<DotDangKyKTX.IRecord> = {
			...restValues,
			maKhoaNganh: values?.maKhoaNganh ?? [],
			phongTheoToaNha,
		};

		if (edit) {
			await putModel(record?._id ?? '', payload).catch((er) => console.log(er));
		} else {
			await postModel(payload).catch((er) => console.log(er));
		}
	};

	return (
		<Card title={`${edit ? 'Chỉnh sửa' : 'Thêm mới'} đợt đăng ký ký túc xá`}>
			<Form layout='vertical' onFinish={onFinish} form={form}>
				<Row gutter={[12, 0]}>
					<Col span={24} md={12}>
						<Form.Item name='tenDot' label='Tên đợt' rules={[...rules.required, ...rules.text, ...rules.length(250)]}>
							<Input placeholder='Nhập tên đợt' />
						</Form.Item>
					</Col>
					<Col span={24} md={12}>
						<Form.Item name='maHocKy' label='Học kỳ' rules={[...rules.required]}>
							<SelectHocKy selectMa />
						</Form.Item>
					</Col>
					<Col span={24} md={12}>
						<Form.Item name='thoiGianBatDau' label='Thời gian bắt đầu' rules={[...rules.required]}>
							<MyDatePicker showTime={{ showHour: true, showMinute: true }} format='HH:mm DD/MM/YYYY' />
						</Form.Item>
					</Col>
					<Col span={24} md={12}>
						<Form.Item name='thoiGianKetThuc' label='Thời gian kết thúc' rules={[...rules.required]}>
							<MyDatePicker showTime={{ showHour: true, showMinute: true }} format='HH:mm DD/MM/YYYY' />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item name='maKhoaNganh' label='Khóa ngành áp dụng' rules={[...rules.required]}>
							<FormItemKhoaNganh showTrinhDo={false} showHinhThuc={false} />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='toaNhaIds' label='Tòa nhà'>
							<SelectToaNha
								multiple
								selectMa
								allowClear
								onChange={(ids) => setSelectedToaNhaIds(Array.isArray(ids) ? ids : ids ? [ids] : [])}
							/>
						</Form.Item>
					</Col>
				</Row>

				{selectedToaNhaIds.length ? (
					<div style={{ marginTop: 12 }}>
						<RoomTable
							toaNhaIds={selectedToaNhaIds}
							selectedRowKeys={currentSelectedPhongKeys}
							onChangeSelectedKeys={(_keys, rows) => {
								const nextSelectedMap = rows.reduce<Record<string, string[]>>((acc, row: any) => {
									const maToaNha = row?.maToaNha ?? row?.toaNha?.ma;
									if (!maToaNha) return acc;

									if (!acc[maToaNha]) acc[maToaNha] = [];
									acc[maToaNha].push(row?.ma);
									return acc;
								}, {});

								setSelectedPhongTheoToaNha((prev) => {
									const merged = { ...prev };
									selectedToaNhaIds.forEach((maToaNha) => {
										if (nextSelectedMap[maToaNha]) merged[maToaNha] = nextSelectedMap[maToaNha];
										else delete merged[maToaNha];
									});

									return merged;
								});
							}}
						/>
					</div>
				) : null}
				<Col xs={24}>
					<Form.Item name='ghiChu' label='Ghi chú' rules={[...rules.text, ...rules.length(2000)]}>
						<Input.TextArea rows={3} placeholder='Nhập ghi chú' />
					</Form.Item>
				</Col>

				<div className='form-footer'>
					<Button loading={formSubmiting} htmlType='submit' type='primary'>
						{!edit ? 'Thêm mới' : 'Lưu lại'}
					</Button>
					<Button onClick={() => setVisibleForm(false)}>Hủy</Button>
				</div>
			</Form>
		</Card>
	);
};

export default FormDotDangKyKTX;
