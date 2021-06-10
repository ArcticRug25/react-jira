/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState, useEffect } from 'react'
import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useDebounce2, useMount } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debouncedParam = useDebounce2(param, 200)
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
    return () => {}
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return ( 
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
