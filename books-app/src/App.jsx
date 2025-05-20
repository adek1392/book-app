import { Routes, Route } from 'react-router-dom'
import MainNavigation from './components/MainNavigation'
import Home from './pages/Home'
import Read from './pages/Read'

function App() {
	return (
		<>
			<MainNavigation />
			<Routes>
				<Route index={true} element={<Home />} />
				<Route path='read' element={<Read />} />
			</Routes>
		</>
	)
}

export default App
