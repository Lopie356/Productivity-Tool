import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Avatar2 from './components/sessionManager';
import SophisticatedSession from './components/SophisticatedSession';
import StatsView from './components/StatsView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Avatar2 />} />
        <Route
          path='/sophisticated-session'
          element={<SophisticatedSession />}
        />
        <Route path='/stats' element={<StatsView />} />
      </Routes>
    </Router>
  );
}

export default App;
