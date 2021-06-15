/* eslint-disable react-hooks/exhaustive-deps */
import List from './list'
import SearchPanel from './search-panel'
import { useDebounce2, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { Row } from 'components/lib'

export const ProjectListScreen = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
  useDocumentTitle('项目列表', false)

  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象绝不可以放到依赖里（引起无限渲染）
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce2(param, 200))
  const { data: users } = useUser()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>创建项目</Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List setProjectModalOpen={props.setProjectModalOpen} refresh={retry} loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
