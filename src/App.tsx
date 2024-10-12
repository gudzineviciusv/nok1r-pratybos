import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from './screens/home';

import './App.scss';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path="*" element={<HomeScreen />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;
