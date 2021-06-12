/* eslint-disable react-hooks/exhaustive-deps */
import { cleanObject } from 'utils';
import { useEffect } from 'react';
import { Project } from "screens/project-list/list"
import { useAsync } from "./use-async"
import { useHttp } from './http';


export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>()

    useEffect(() => {
        run(client('projects', { data: cleanObject(param || {}) }))
    }, [param])

    return result
}