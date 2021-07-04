import { useDocumentTitle } from 'utils'
import { useBorders } from 'utils/border'
import { useBorderSearchParams, useProjectInUrl } from './util'
import { BorderColumn } from './border-column'
import styled from '@emotion/styled'
import { SearchPanel } from 'screens/border/search-panel'

export const BorderScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: borders } = useBorders(useBorderSearchParams())

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {borders?.map((border) => (
          <BorderColumn border={border} key={border.id} />
        ))}
      </ColumnsContainer>
    </div>
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`
