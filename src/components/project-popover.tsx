import styled from '@emotion/styled'
import { Divider, List, Popover, Typography, Button } from 'antd'
import { useState } from 'react'
import { useProjects } from 'utils/project'

export const ProjectPopover = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
  const { data: projects, isLoading } = useProjects()
  const [visible, setVisible] = useState(false)
  const pinnedProjects = projects?.filter((project) => project.pin)

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible)
  }

  const handleProjectModal = () => {
    handleVisibleChange(false)
    props.setProjectModalOpen(true)
  }

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button onClick={handleProjectModal} type={'link'}>
        创建项目
      </Button>
    </ContentContainer>
  )

  return (
    <Popover visible={visible} onVisibleChange={handleVisibleChange} placement={'bottom'} content={content}>
      项目
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
