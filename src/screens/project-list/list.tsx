import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { User } from './search-panel'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal, useProjectQueryKey } from './util'

export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
}

export default function List({ users, ...props }: ListProps) {
  const { mutate } = useEditProject(useProjectQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(_, project) {
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
          },
        },
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(_, project) {
            return <Link to={String(project.id)}>{project.name}</Link>
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render(_, project) {
            return <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>
          },
        },
        {
          title: '创建时间',
          render(_, project) {
            return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : 'wu'}</span>
          },
        },
        {
          render(_, project) {
            return <More project={project} />
          },
        },
      ]}
      dataSource={props.dataSource}
      {...props}
    />
  )
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())
  const confirmDeleteProject = (id: number) => () => {
    Modal.confirm({
      title: '确定删除这个项目吗?',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteProject({id})
      },
    })
  }

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={'edit'}>
            编辑
          </Menu.Item>
          <Menu.Item onClick={confirmDeleteProject(project.id)} key={'delete'}>
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
  )
}
