import './App.css';
import Home from './pages/Home';
// import Maze from './pages/Maze';
import Github from './pages/Github';
import Skills from './pages/Skills';
// import Creativity from './pages/Creativity';
import Projects from './pages/Projects';
import Footer from './pages/Footer'

function App() {
	return (
		<div className='dev'>
			<Home />
			<Github />
			<Skills />
			<Projects />
			<Footer />
		</div>
	)
}

export default App;
