/* eslint-disable react-hooks/exhaustive-deps */
import List from './list'
import SearchPanel from './search-panel'
import { useDebounce2, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'
import { useProjectModal, useProjectsSearchParams } from './util'
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象绝不可以放到依赖里（引起无限渲染）
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce2(param, 200))
  const { data: users } = useUser()
  const { open } = useProjectModal()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={'link'}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
