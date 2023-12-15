import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Card from './Component/Card.jsx';
import Signup from './Component/Signup.jsx';
import Login from "./Component/login.jsx";
import Upload from './Component/upload.jsx';
import Score from './Component/score.jsx';
import Dashboard from './Component/dashboard.jsx';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signup' element={<Card />} />
          <Route path ='/login' element={<Login/>} />
          <Route path='/admin' element={<Signup/>}/>
          <Route path='/upload' element={<Upload />}/>
          <Route path='/Score' element={<Score />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
