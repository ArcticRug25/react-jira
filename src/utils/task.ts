import { useHttp } from './http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { Task, TaskType } from 'types/task';
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';
import { Project } from 'types/project';


export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();

    return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}

export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp()

    return useMutation((params: Partial<Task>) =>
        client(`tasks`, {
            data: params,
            method: 'POST'
        }),
        useAddConfig(queryKey)
    )
}

export const useTaskTypes = () => {
    const client = useHttp();

    return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'))
}

export const useTask = (id?: number) => {
    const client = useHttp()
    return useQuery<Project>(
        ['task', { id }],
        () => client(`tasks/${id}`), {
        enabled: !!id
    })
}

export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp()
    // console.log(queryKey)
    return useMutation(
        (params: Partial<Task>) => client(`tasks/${params.id}`, {
            method: 'PATCH',
            data: params
        }),
        useEditConfig(queryKey)
    );
}


export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        ({ id }: { id: number }) =>
            client(`tasks/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};

// export const useReorderTask = (queryKey: QueryKey) => {
//     const client = useHttp();
//     return useMutation((params: SortProps) => {
//         return client("tasks/reorder", {
//             data: params,
//             method: "POST",
//         });
//     }, useReorderTaskConfig(queryKey));
// };