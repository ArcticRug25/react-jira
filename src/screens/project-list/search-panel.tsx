/* @jsxImportSource @emotion/react */
import { Input } from 'antd'
import { Form } from 'antd'
import { UserSelect } from 'components/user-select'
import { Project } from 'types/project'
import { User } from 'types/user'

interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export default function SearchPanel({ users, param, setParam }: SearchPanelProps) {
  return (
    <Form css={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          placeholder={'项目名'}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  )
}
