import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './stylesheets/styles.scss';


//Pages
import Home from './pages/Home';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <div className = "pages">
          <Routes>
            {/* <Route
              path = "/"
              element = {<Login/>}
            /> */}
            <Route
              path = "/home"b
              element = {<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
/**
 * pages = containers that hold the routes?
 * 
 */