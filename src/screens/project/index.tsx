import { Link } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router'
import { BorderScreen } from 'screens/border'
import { EpicScreen } from 'screens/epic'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={'border'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/border'} element={<BorderScreen />} />
        <Route path={'/epic'} element={<EpicScreen />} />
        <Navigate to={window.location.pathname + '/border'} replace />
      </Routes>
    </div>
  )
}
