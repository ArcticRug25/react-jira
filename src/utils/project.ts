import { cleanObject } from 'utils';
import { useEffect, useCallback } from 'react';
import { Project } from "screens/project-list/list"
import { useAsync } from "./use-async"
import { useHttp } from './http';


export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>()
    const fetchProjects = useCallback(() => client('projects', { data: cleanObject(param || {}) }), [client, param])

    useEffect(() => {
        run(fetchProjects(), {
            retry: fetchProjects
        })
    }, [param, run, fetchProjects])

    return result
}

export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }))
    }

    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }

    return {
        mutate,
        ...asyncResult
    }
}