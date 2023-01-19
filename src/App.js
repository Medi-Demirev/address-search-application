import { Routes, Route } from 'react-router-dom';
import HomePage from "./components/Home page/HomePage";
import "./App.css";


function App() {

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>

    </div>
  );
}

export default App;
