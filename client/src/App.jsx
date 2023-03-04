import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './stylesheets/styles.scss';

//Contexts
import { ItinerariesContextProvider } from './contexts/ItinerariesContext';
import { ActivitiesContextProvider } from './contexts/ActivitiesContext';


//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <div className = "pages">
          <Routes>
            <Route
              path = "/"
              element = {<Login/>}
            />
            <Route
              path = "/home"
              element = {
                <ItinerariesContextProvider>
                  <ActivitiesContextProvider>
                    <Home />
                  </ActivitiesContextProvider>
                </ItinerariesContextProvider>
              }
            />
            <Route
              path = "/signup"
              element = {<Signup />}
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