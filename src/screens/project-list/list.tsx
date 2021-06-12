import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { User } from './search-panel'

export interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[]
}

export default function List({ users, ...props }: ListProps) {
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
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
      ]}
      dataSource={props.dataSource}
      {...props}
    />
  )
}
