import { ETrangThaiPhong } from '@/services/KyTucXa/constant';
import type { KyTucXa } from '@/services/KyTucXa/typing';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { useEffect } from 'react';
import { useIntl, useModel } from 'umi';
import SelectToaKyTucXa from '../../ToaKyTucXa/components/Select';

const FormPhongKyTucXa = (props: any) => {
	const intl = useIntl();
	const [form] = Form.useForm();
	const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } =
		useModel('kytucxa.phongkytucxa');
	const { title } = props;

	useEffect(() => {
		if (!visibleForm) resetFieldsForm(form);
		else if (record?._id) form.setFieldsValue(record);
	}, [record?._id, visibleForm]);

	const onFinish = async (values: KyTucXa.IPhongKyTucXa) => {
		if (edit) {
			putModel(record?._id ?? '', values)
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
					<Col xs={24}>
						<Form.Item name='maToaNha' label='Tòa nhà ký túc xá' rules={[...rules.required]}>
							<SelectToaKyTucXa selectMa />
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item name='ma' label='Mã phòng' rules={[...rules.required, ...rules.text, ...rules.length(20)]}>
							<Input style={{ width: '100%' }} placeholder='Nhập mã phòng' />
						</Form.Item>
					</Col>

					<Col xs={24}>
						<Form.Item name='soGiuong' label='Số lượng tối đa' rules={[...rules.required]}>
							<InputNumber style={{ width: '100%' }} placeholder='Nhập số lượng' />
						</Form.Item>
					</Col>
					<Col xs={12}>
						<Form.Item name='soTang' label='Tầng thứ'>
							<InputNumber style={{ width: '100%' }} placeholder='Nhập tầng thứ' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name='trangThai' label='Trạng thái' rules={[...rules.required]}>
							<Select
								placeholder='Chọn trạng thái'
								options={Object.values(ETrangThaiPhong).map((item) => ({ key: item, value: item, label: item }))}
							/>
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
