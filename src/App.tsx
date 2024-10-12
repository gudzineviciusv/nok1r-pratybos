import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from './screens/home';

import './App.scss';
import UserLocationMap from './screens/location';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/zemelapis' element={<UserLocationMap />} />
            <Route path="*" element={<HomeScreen />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;
