import styled from '@emotion/styled'
import { useState } from 'react'
import { Row, ButtonNoPadding } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Dropdown, Menu, Button } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'

/**
 * grid 和 flex 各自的应用场景
 * 1、要考虑，是一维布局 还是 还是 二维布局
 *    一般来说，一维布局用flex，二维布局用grid
 * 2、是从内容出发还是从布局出发？
 *   从内容出发：你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自适应
 *   从布局出发：先规划网格（数量一般比较固定），然后再把元素往里面填充
 *   从内容触发，用flex
 *   从布局出发，用grid
 */

export default function AuthenticatedApp() {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible)
  }

  return (
    <Container>
      <PageHeader
        visible={visible}
        handleVisibleChange={handleVisibleChange}
        projectButton={
          <ButtonNoPadding
            onClick={() => {
              setVisible(false)
              setProjectModalOpen(true)
            }}
            type={'link'}
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <ButtonNoPadding onClick={() => setProjectModalOpen(true)}>打开</ButtonNoPadding>
      <Main>
        <Router>
          <Routes>
            <Route
              path={'/projects'}
              element={
                <ProjectListScreen
                  projectButton={
                    <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
            <Navigate to={'/projects'} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </Container>
  )
}

const PageHeader = (props: {
  projectButton: JSX.Element
  visible: boolean
  handleVisibleChange: (visible: boolean) => void
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        </ButtonNoPadding>
        <ProjectPopover {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            <Button type={'link'} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={'link'} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  )
}

const Container = styled.div`
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main``
