import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import AddToCartNotification from './components/AddToCartNotification/AddToCartNotification';
import { useCart } from './context/CartContext';
import './App.css';

const AppContent = () => {
  const { showNotification, setShowNotification, getTotalItems, getTotalPrice } = useCart();
  const location = useLocation();

  // Hide notification when on cart or checkout page
  React.useEffect(() => {
    if (location.pathname === '/cart' || location.pathname === '/checkout') {
      setShowNotification(false);
    } else if (getTotalItems() > 0) {
      setShowNotification(true);
    }
  }, [location.pathname, setShowNotification, getTotalItems]);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      {showNotification && (
        <AddToCartNotification
          totalItems={getTotalItems()}
          totalPrice={getTotalPrice()}
          onClose={() => setShowNotification(false)}
        />
      )}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <OrderProvider>
          <AppContent />
        </OrderProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
