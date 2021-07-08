import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util'
import { KanbanColumn } from './kanban-column'
import styled from '@emotion/styled'
import { SearchPanel } from 'screens/kanban/search-panel'
import { ScreenContainer } from 'components/lib'
import { useTasks } from 'utils/task'
import { Spin } from 'antd'
import { CreateKanban } from './create-kanban'
import { TaskModal } from './task-modal'
import { DragDropContext } from 'react-beautiful-dnd'
import { Drag, Drop, DropChild } from 'components/drag-and-drop'
import { useMemo } from 'react'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading
  const wrapperWidth = useMemo(() => {
    if (kanbans) {
      return kanbans?.length * (27 + 1.5) + 'rem'
    }
    return 0
  }, [kanbans])

  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <ColumnsContainer>
            <div style={{ width: wrapperWidth }}>
              <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
                <DropChild style={{ display: 'flex', height: '100%' }}>
                  {kanbans?.map((kanban, index) => (
                    <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index}>
                      <KanbanColumn kanban={kanban} />
                    </Drag>
                  ))}
                </DropChild>
              </Drop>
            </div>

            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  )
}

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
