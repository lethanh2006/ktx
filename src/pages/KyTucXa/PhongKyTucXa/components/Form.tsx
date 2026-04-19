import { EGioiTinh, ELoaiKhoanThu } from '@/services/KyTucXa/constant';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import UploadFile from '@/components/Upload/UploadFile';
import { useEffect } from 'react';
import { useIntl, useModel } from 'umi';

const FormPhongKyTucXa = (props: any) => {
	const intl = useIntl();
	const [form] = Form.useForm();
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } =
		useModel('kytucxa.phongkytucxa');
	const { danhSach: danhSachToa, getAllModel: getAllToa } = useModel('kytucxa.toakytucxa');
	const { danhSach: danhSachKhoanThu, getAllModel: getAllKhoanThu } = useModel('kytucxa.khoanthuktx');
	const { title } = props;

	useEffect(() => {
		if (visibleForm) {
			getAllToa();
			getAllKhoanThu();
			if (record?._id) form.setFieldsValue(record);
			else resetFieldsForm(form);
		}
	}, [record?._id, visibleForm]);

	const isView = false;

	const onFinish = async (values: KyTucXa.IPhongKyTucXa) => {
		if (edit) {
			putModel(record?.ma ?? record?._id ?? '', values)
				.then()
				.catch((er) => console.log(er));
		} else
			postModel(values)
				.then()
				.catch((er) => console.log(er));
	};
	return (
		<Card title={`${edit ? 'Chỉnh sửa' : 'Thêm mới'} ${title?.toLowerCase()}`}>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Row gutter={[12, 0]} style={{ marginBottom: 12 }}>
					{!edit && (
						<>
							<Col xs={24} md={12}>
								<Form.Item name='ma' label='Mã phòng' rules={[...rules.required]}>
									<Input style={{ width: '100%' }} placeholder='Nhập mã phòng (ví dụ: B1-101)' />
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item name='ten' label='Tên phòng'>
									<Input style={{ width: '100%' }} placeholder='Nhập tên phòng' />
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item name='maGioiTinh' label='Giới tính' rules={[...rules.required]}>
									<Select placeholder='Chọn giới tính' options={[
										{ value: EGioiTinh.NAM, label: 'Nam' },
										{ value: EGioiTinh.NU, label: 'Nữ' },
									]} />
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item name='maToaNha' label='Tòa nhà'>
									<Select
										placeholder='Chọn tòa'
										options={danhSachToa?.map((item: any) => ({
											value: item?.ma || item?._id,
											label: item?.ten,
										}))}
									/>
								</Form.Item>
							</Col>
						</>
					)}
					{edit && (
						<Col xs={24}>
							<div style={{ marginBottom: 12, padding: '8px 12px', background: '#f5f5f5', borderRadius: 6 }}>
								<span style={{ fontWeight: 500 }}>Phòng: </span>{record?.ma}{record?.ten ? ` — ${record.ten}` : ''}
								{record?.maToaNha && <span style={{ marginLeft: 16 }}><span style={{ fontWeight: 500 }}>Tòa: </span>{record.maToaNha}</span>}
							</div>
						</Col>
					)}
					<Col xs={24} md={12}>
						<Form.Item name='soLuongToiDa' label='Số lượng tối đa' rules={[...rules.required]}>
							<InputNumber disabled={isView} min={1} style={{ width: '100%' }} placeholder='Nhập số lượng tối đa' />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='cachBoTri' label='Cách bố trí phòng'>
							<Input disabled={isView} placeholder='Nhập cách bố trí (ví dụ: 3 tầng, mỗi tầng 2 phòng)' />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='maKhoanThuPhong' label='Bảng giá phí phòng'>
							<Select
								disabled={isView}
								placeholder='Chọn khoản thu phòng'
								options={danhSachKhoanThu
									?.filter((item: any) => item?.loai === ELoaiKhoanThu.KTX)
									?.map((item: any) => ({
										value: item?._id,
										label: item?.ten,
									}))}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='maKhoanThuCoc' label='Bảng giá phí cọc'>
							<Select
								disabled={isView}
								placeholder='Chọn khoản thu cọc'
								options={danhSachKhoanThu
									?.filter((item: any) => item?.loai === ELoaiKhoanThu.KTX)
									?.map((item: any) => ({
										value: item?._id,
										label: item?.ten,
									}))}
							/>
						</Form.Item>
					</Col>
					<Col xs={24}>
						<div className='fw500' style={{ marginBottom: 8 }}>
							Danh sách tiện ích
						</div>
						<Form.List name='danhSachTienIch'>
							{(fields, { add, remove }, { errors }) => (
								<>
									{fields.map((field, index) => (
										<Row gutter={[12, 0]} key={field.key} style={{ marginBottom: 12 }}>
											<Col xs={24} md={10}>
												<Form.Item
													label='Tên tiện ích'
													name={[index, 'ten']}
													rules={[...rules.required]}
													style={{ marginBottom: 0 }}
												>
													<Input disabled={isView} placeholder='Tên tiện ích (ví dụ: Điều hòa)' />
												</Form.Item>
											</Col>
											<Col xs={24} md={10}>
												<Form.Item
													label='Mô tả'
													name={[index, 'moTa']}
													style={{ marginBottom: 0 }}
												>
													<Input disabled={isView} placeholder='Mô tả (ví dụ: 1 máy)' />
												</Form.Item>
											</Col>
											<Col xs={24} md={4}>
												<Button
													disabled={isView}
													danger
													type='link'
													title='Xóa tiện ích'
													icon={<DeleteOutlined />}
													onClick={() => remove(field.name)}
													style={{ marginTop: 30 }}
												/>
											</Col>
										</Row>
									))}
									<Form.ErrorList errors={errors} />
									{!isView && (
										<Button
											disabled={isView}
											onClick={() => add({ ten: '', moTa: '' })}
											icon={<PlusOutlined />}
											size='small'
											type='default'
											style={{ marginBottom: 8 }}
										>
											Thêm tiện ích
										</Button>
									)}
								</>
							)}
						</Form.List>
					</Col>
					<Col xs={24}>
						<Form.Item name='moTa' label='Mô tả phòng'>
							<Input.TextArea rows={3} disabled={isView} placeholder='Nhập mô tả phòng' />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item name='danhSachAnh' label='Ảnh phòng'>
							<UploadFile maxCount={10} accept='image/*' disabled={isView} />
						</Form.Item>
					</Col>
				</Row>

				<div className='form-footer'>
					<Button loading={formSubmiting} htmlType='submit' type='primary'>
						{!edit
							? `${intl.formatMessage({ id: 'global.button.themmoi' })}`
							: `${intl.formatMessage({ id: 'global.button.luulai' })}`}
					</Button>
					<Button onClick={() => setVisibleForm(false)}>{intl.formatMessage({ id: 'global.button.huy' })}</Button>
				</div>
			</Form>
		</Card>
	);
};

export default FormPhongKyTucXa;
