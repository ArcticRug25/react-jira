import { useHttp } from './http';
import { useQuery } from 'react-query';
import { Task, TaskType } from 'types/task';


export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();

    return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}

export const useTaskTypes = () => {
    const client = useHttp();

    return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'))
}
