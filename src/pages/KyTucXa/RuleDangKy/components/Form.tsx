import { EGioiTinh, ERuleType, transRuleType } from '@/services/KyTucXa/constant';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import { useEffect } from 'react';
import { useIntl, useModel } from 'umi';

const FormRuleDangKy = (props: any) => {
	const intl = useIntl();
	const [form] = Form.useForm();
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } =
		useModel('kytucxa.dangkythuerule');
	const { danhSach: danhSachToa, getAllModel: getAllToa } = useModel('kytucxa.toakytucxa');
	const { danhSach: danhSachPhong, getAllModel: getAllPhong } = useModel('kytucxa.phongkytucxa');
	const { title } = props;

	const selectedLoai = Form.useWatch('loai', form);

	useEffect(() => {
		if (visibleForm) {
			getAllToa();
			getAllPhong();
			if (record?._id) {
				form.setFieldsValue({
					...record,
					...(record.giaTri ?? {}),
				});
			} else {
				resetFieldsForm(form);
				form.setFieldsValue({ isActive: true });
			}
		}
	}, [record?._id, visibleForm]);

	const onFinish = async (values: any) => {
		const { gioiTinh, maxPerKhoa, minAge, maxAge, ...rest } = values;

		let giaTri: any = {};
		if (rest.loai === ERuleType.GIOI_TINH) giaTri = { gioiTinh };
		else if (rest.loai === ERuleType.MAX_PER_KHOA) giaTri = { maxPerKhoa };
		else if (rest.loai === ERuleType.MIN_AGE) giaTri = { minAge };
		else if (rest.loai === ERuleType.MAX_AGE) giaTri = { maxAge };

		const payload: Partial<KyTucXa.IDangKyThueRule> = { ...rest, giaTri };

		if (edit) {
			putModel(record?._id ?? '', payload)
				.then()
				.catch((er) => console.log(er));
		} else {
			postModel(payload)
				.then()
				.catch((er) => console.log(er));
		}
	};

	return (
		<Card title={`${edit ? 'Chỉnh sửa' : 'Thêm mới'} ${title?.toLowerCase()}`}>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Row gutter={[12, 0]}>
					<Col xs={24} md={12}>
						<Form.Item name='ma' label='Mã rule' rules={[...rules.required]}>
							<Input disabled={edit} placeholder='Ví dụ: RULE-GIOI-TINH-B1' />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='ten' label='Tên rule' rules={[...rules.required]}>
							<Input placeholder='Ví dụ: Giới hạn giới tính tòa B1' />
						</Form.Item>
					</Col>

					<Col xs={24} md={12}>
						<Form.Item name='loai' label='Loại rule' rules={[...rules.required]}>
							<Select
								placeholder='Chọn loại rule'
								options={Object.values(ERuleType).map((v) => ({
									value: v,
									label: transRuleType[v],
								}))}
								onChange={() => {
									form.resetFields(['gioiTinh', 'maxPerKhoa', 'minAge', 'maxAge']);
								}}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='stt' label='Thứ tự ưu tiên'>
							<InputNumber min={1} style={{ width: '100%' }} placeholder='Số thứ tự (nhỏ hơn = cao hơn)' />
						</Form.Item>
					</Col>

					<Col xs={24} md={12}>
						<Form.Item name='maToaNha' label='Áp dụng cho tòa'>
							<Select
								allowClear
								placeholder='Chọn tòa (để trống = áp dụng tất cả)'
								options={danhSachToa?.map((item: any) => ({
									value: item?.ma,
									label: item?.ten,
								}))}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='maPhong' label='Áp dụng cho phòng cụ thể'>
							<Select
								allowClear
								placeholder='Chọn phòng (để trống = áp dụng cả tòa)'
								options={danhSachPhong?.map((item: any) => ({
									value: item?.ma,
									label: `${item?.ma}${item?.ten ? ` — ${item.ten}` : ''}`,
								}))}
							/>
						</Form.Item>
					</Col>

					{selectedLoai === ERuleType.GIOI_TINH && (
						<Col xs={24} md={12}>
							<Form.Item name='gioiTinh' label='Giới tính cho phép' rules={[...rules.required]}>
								<Select
									placeholder='Chọn giới tính'
									options={[
										{ value: EGioiTinh.NAM, label: 'Nam' },
										{ value: EGioiTinh.NU, label: 'Nữ' },
									]}
								/>
							</Form.Item>
						</Col>
					)}
					{selectedLoai === ERuleType.MAX_PER_KHOA && (
						<Col xs={24} md={12}>
							<Form.Item name='maxPerKhoa' label='Số SV tối đa mỗi khoa' rules={[...rules.required]}>
								<InputNumber min={1} style={{ width: '100%' }} placeholder='Ví dụ: 2' />
							</Form.Item>
						</Col>
					)}
					{selectedLoai === ERuleType.MIN_AGE && (
						<Col xs={24} md={12}>
							<Form.Item name='minAge' label='Tuổi tối thiểu' rules={[...rules.required]}>
								<InputNumber min={0} style={{ width: '100%' }} placeholder='Ví dụ: 18' />
							</Form.Item>
						</Col>
					)}
					{selectedLoai === ERuleType.MAX_AGE && (
						<Col xs={24} md={12}>
							<Form.Item name='maxAge' label='Tuổi tối đa' rules={[...rules.required]}>
								<InputNumber min={0} style={{ width: '100%' }} placeholder='Ví dụ: 30' />
							</Form.Item>
						</Col>
					)}

					<Col xs={24} md={12}>
						<Form.Item name='noiDungLyDo' label='Nội dung lý do từ chối'>
							<Input placeholder='Ví dụ: Phòng dành cho sinh viên Nam' />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='isActive' label='Kích hoạt' valuePropName='checked'>
							<Switch />
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

export default FormRuleDangKy;
