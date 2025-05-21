import React, { createContext, useContext, useState, useEffect } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface DeliveryAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
  placedAt: number;
  status: 'placed' | 'delivered' | 'cancelled';
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'placedAt' | 'status'>) => void;
  cancelOrder: (orderId: string) => void;
  getActiveOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Check for completed orders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(currentOrders => {
        const now = Date.now();
        return currentOrders.filter(order => {
          // Keep orders that are less than 2 minutes old and not cancelled
          if (order.status === 'cancelled') return false;
          if (now - order.placedAt < 120000) return true;
          
          // Mark as delivered if 2 minutes have passed
          if (order.status === 'placed') {
            order.status = 'delivered';
          }
          
          // Remove orders that are more than 3 minutes old
          return now - order.placedAt < 180000;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addOrder = (orderData: Omit<Order, 'id' | 'placedAt' | 'status'>) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      ...orderData,
      placedAt: Date.now(),
      status: 'placed'
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' }
          : order
      )
    );
  };

  const getActiveOrders = () => {
    return orders.filter(order => order.status === 'placed');
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder, getActiveOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}; 