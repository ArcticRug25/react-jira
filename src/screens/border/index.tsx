import { useDocumentTitle } from 'utils'
import { useBorders } from 'utils/border'
import { useBorderSearchParams, useProjectInUrl } from './util'
import { BorderColumn } from './border-column'
import styled from '@emotion/styled'
import { SearchPanel } from 'screens/border/search-panel'
import { ScreenContainer } from 'components/lib'

export const BorderScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: borders } = useBorders(useBorderSearchParams())

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {borders?.map((border) => (
          <BorderColumn border={border} key={border.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
