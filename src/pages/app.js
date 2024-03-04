import React, {useState, useEffect} from 'react';
import Hero from './Hero';
import Login from './login';
import Signup from './signup';
import { BrowserRouter, BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NumberSub from './numbersub';
 





function App() {
 
  return (
    
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/NumberSub" element={<NumberSub/>} />
      <Route path="/Hero" element={<Hero />} />
      
    </Routes>
  </BrowserRouter>
  );
}
 
export default App;