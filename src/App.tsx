import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <OrderProvider>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </OrderProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
