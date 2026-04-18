import useInitModel from '@/hooks/useInitModel';

export default () => {
    const objInit = useInitModel<DotDangKyKTX.IRecord>('dot-dang-ky-ky-tuc-xa');

    return {
        ...objInit,
    };
};
