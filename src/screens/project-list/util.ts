import { useMemo } from "react"
import { useProject } from "utils/project"
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url"

export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const
}

export const useProjectQueryKey = () => {
    const [params] = useProjectsSearchParams()
    return ['projects', params]
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam(['projectCreate'])
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
    const setUrlParams = useSetUrlSearchParam()
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

    const open = () => setProjectModalOpen({ projectCreate: true })
    const close = () => {
        setUrlParams({ projectCreate: "", editingProjectId: "" })
    }
    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}