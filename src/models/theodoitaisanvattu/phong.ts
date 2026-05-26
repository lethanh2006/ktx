import useInitModel from '@/hooks/useInitModel';
export default () => {
	const objInit = useInitModel<Phong.IRecord>('phong');
	return {
		...objInit,
	};
};
