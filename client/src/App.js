

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';



// Components
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';


// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishlistScreen';


function App() {


  const [sideToggle, setSideToggle] = useState(false);

  return (
 <Router>

     
     
     <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
 
<main>
     <Routes>
        <Route  path="/" element={<HomeScreen/>} />
          <Route  path="/product/:id" element={<ProductScreen/>} />
          <Route  path="/cart" element={<CartScreen/>} />
          <Route path="/wishlist" element={<WishlistScreen/>}/>
        </Routes>
      </main>
    </Router>

);
    
  
}

export default App;
