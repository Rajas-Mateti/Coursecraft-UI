
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React,{useState} from 'react';

import SubmitRequest from './submitRequest/SubmitRequest';
import NavBar from './commonComponents/Navbar';
import Courses from './submitRequest/AllCourses';

function App(){
      return(
      <>
      <div  className='bg' >
        <Router>
          <div>
            <NavBar />
            <div  >
              <Routes>
                <Route className="card" path="/" element={<SubmitRequest />} />
                <Route path="/courses" element={<Courses />} />
              </Routes>
             </div>
          </div>
        </Router>
      </div>
      </>
    );
}

export default App;
