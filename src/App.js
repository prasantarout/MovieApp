
import './App.css';
import Home from './pages/home/Home';
import SingleMovie from './components/SingleMovie'
import { BrowserRouter,Routes, Route, Link } from "react-router-dom";
function App() {
  return (
   
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="singleMovie" element={<SingleMovie/>} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
