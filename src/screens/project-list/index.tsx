/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import List from './list'
import SearchPanel from './search-panel'
import { useDebounce2, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debouncedParam = useDebounce2(param, 200)
  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUser()

  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
