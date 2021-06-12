/* eslint-disable react-hooks/exhaustive-deps */
import { cleanObject } from 'utils';
import { useEffect } from 'react';
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { User } from "../screens/project-list/search-panel";

export const useUser = (param?: Partial<User>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<User[]>();

    useEffect(() => {
        run(client("users", { data: cleanObject(param || {}) }))
    }, [param])

    return result
}