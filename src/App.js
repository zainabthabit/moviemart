import logo from './logo.svg';
import './App.css';
import { HomePage } from './components/HomePage';
import NavBar from './components/NavBar';
import MoviesSlider from './components/MoviesSlider/MoviesSlider'
function App() {

    return (
        <div className='bg-slate-300'>
            <NavBar />
            <HomePage />



        </div>
    );
}

export default App;
