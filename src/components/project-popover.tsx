import styled from '@emotion/styled'
import { Divider, List, Popover, PopoverProps, Typography } from 'antd'
import { useProjects } from 'utils/project'

interface ProjectPopoverProps extends PopoverProps {
  projectButton: JSX.Element
  handleVisibleChange: (v:boolean) => void
}

export const ProjectPopover = (props: ProjectPopoverProps) => {
  const { data: projects, isLoading } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)

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
      {props.projectButton}
    </ContentContainer>
  )

  return (
    <Popover visible={props.visible} onVisibleChange={props.handleVisibleChange} placement={'bottom'} content={content} >
      项目
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
