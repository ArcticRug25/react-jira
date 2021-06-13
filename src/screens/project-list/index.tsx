/* eslint-disable react-hooks/exhaustive-deps */
import List from './list'
import SearchPanel from './search-panel'
import { useDebounce2, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'

export const ProjectListScreen = () => {
  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象绝不可以放到依赖里（引起无限渲染）
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const debouncedParam = useDebounce2(param, 200)
  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUser()

  useDocumentTitle('项目列表', false)

  useUrlQueryParam(['random'])

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
