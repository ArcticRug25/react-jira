import { useHttp } from './http';
import { useQuery } from 'react-query';
import { Border } from "types/border";

export const useBorders = (param?: Partial<Border>) => {
    const client = useHttp();

    return useQuery<Border[]>(['borders', param], () => client('kanbans', { data: param }))
}