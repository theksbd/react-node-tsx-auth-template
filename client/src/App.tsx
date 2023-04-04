import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Authentication from './pages/Authentication/Authentication';
import Problem from './pages/Problem/Problem';
import CodingProblem from './pages/CodingProblem/CodingProblem';
import Math from './pages/Math/Math';
import Contest from './pages/Contest/Contest';
import Discussion from './pages/Discussion/Discussion';
import Rank from './pages/Rank/Rank';
import './App.css';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Toaster position='top-center' reverseOrder={false} />
        <Header />
        <Routes>
          <Route path='/' element={<Problem />} />
          <Route path='coding' element={<CodingProblem />} />
          <Route path='math' element={<Math />} />
          <Route path='contest' element={<Contest />} />
          <Route path='discussion' element={<Discussion />} />
          <Route path='rank' element={<Rank />} />
          <Route path='auth' element={<Authentication />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
