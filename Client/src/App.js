import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { AddProduct } from './Components/AddProduct';
import { Home } from './Components/Home';
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/scandiweb' element={<Home />}/>
          <Route path='/add-product/*' element={<AddProduct />}/>
        </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
