import SelectHocKy from '@/pages/DaoTaoV2/HocKy/HocKy/components/SelectHocKy';
import { ETrangThaiDotDangKyKTX } from '@/services/KyTucXa/constant';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useIntl, useModel } from 'umi';

const FormDotDangKy = (props: any) => {
	const intl = useIntl();
	const [form] = Form.useForm();
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } =
		useModel('kytucxa.dotdangkyktx');
	const { title } = props;

	useEffect(() => {
		if (!visibleForm) resetFieldsForm(form);
		else if (record?._id) {
			form.setFieldsValue({
				...record,
				ngayBatDau: record.ngayBatDau ? moment(record.ngayBatDau) : undefined,
				ngayKetThuc: record.ngayKetThuc ? moment(record.ngayKetThuc) : undefined,
			});
		}
	}, [record?._id, visibleForm]);

	const onFinish = async (values: any) => {
        const payload = {
            ...values,
            ngayBatDau: values.ngayBatDau?.toISOString(),
            ngayKetThuc: values.ngayKetThuc?.toISOString(),
        }
		if (edit) {
			putModel(record?._id ?? '', payload)
				.then()
				.catch((er) => console.log(er));
		} else
			postModel(payload)
				.then()
				.catch((er) => console.log(er));
	};
	return (
		<Card title={`${edit ? 'Chỉnh sửa' : 'Thêm mới'} ${title?.toLowerCase() || 'đợt đăng ký'}`}>
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Row gutter={[12, 0]} style={{ marginBottom: 12 }}>
					<Col xs={24}>
						<Form.Item name='tenDot' label='Tên đợt' rules={[...rules.required, ...rules.text, ...rules.length(255)]}>
							<Input style={{ width: '100%' }} placeholder='Nhập tên đợt' />
						</Form.Item>
					</Col>
					
					<Col xs={24} md={12}>
						<Form.Item name='maHocKy' label='Học kỳ' rules={[...rules.required]}>
                            <SelectHocKy 
                                selectMa 
                                onChange={((val: string, option: any) => {
                                    form.setFieldValue('tenHocKy', option?.label)
                                }) as any} 
                            />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='tenHocKy' label='Tên học kỳ' rules={[...rules.required, ...rules.text, ...rules.length(255)]}>
							<Input style={{ width: '100%' }} placeholder='Nhập tên học kỳ' disabled />
						</Form.Item>
					</Col>

					<Col xs={24} md={12}>
						<Form.Item name='idDotThu' label='ID đợt thu'>
							<Input style={{ width: '100%' }} placeholder='Nhập ID đợt thu' />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='trangThai' label='Trạng thái' rules={[...rules.required]}>
							<Select
								placeholder='Chọn trạng thái'
								options={Object.values(ETrangThaiDotDangKyKTX).map((item) => ({ key: item, value: item, label: item }))}
							/>
						</Form.Item>
					</Col>

					<Col xs={24} md={12}>
						<Form.Item name='ngayBatDau' label='Ngày bắt đầu' rules={[...rules.required]}>
							<DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} placeholder='Chọn ngày bắt đầu' />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item name='ngayKetThuc' label='Ngày kết thúc' rules={[...rules.required]}>
							<DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} placeholder='Chọn ngày kết thúc' />
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

export default FormDotDangKy;
