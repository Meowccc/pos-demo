import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StaffContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 20px;
  text-align: center;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 1.8rem;
`;

const Content = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  min-height: 600px;
`;

const OrderSection = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
`;

const SectionTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
`;

const OrderList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const OrderItem = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3498db;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
  }

  ${props => props.active && `
    border-color: #3498db;
    background: #ebf3fd;
  `}
`;

const OrderNumber = styled.div`
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const CustomerName = styled.div`
  color: #7f8c8d;
  margin-top: 5px;
`;

const OrderTotal = styled.div`
  color: #e74c3c;
  font-weight: bold;
  margin-top: 5px;
`;

const ActionSection = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

const ProductButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 15px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: #27ae60;
    color: white;
  }

  &.secondary {
    background: #e74c3c;
    color: white;
  }

  &.warning {
    background: #f39c12;
    color: white;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`;

const CurrentOrder = styled.div`
  background: white;
  border: 2px solid #3498db;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const OrderItems = styled.div`
  margin-top: 15px;
`;

const OrderItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  font-weight: 500;
`;

const ItemPrice = styled.span`
  color: #e74c3c;
  font-weight: bold;
`;

const TotalAmount = styled.div`
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #3498db;
`;

const ConnectionStatus = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  background: ${props => props.connected ? '#27ae60' : '#e74c3c'};
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  z-index: 1000;
`;

const DebugInfo = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 1000;
`;

function StaffDisplay() {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentOrderItems, setCurrentOrderItems] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [debugInfo, setDebugInfo] = useState('初始化中...');
  const [broadcastChannel, setBroadcastChannel] = useState(null);

  const products = [
    { name: 'iPhone 15 Pro Max', price: 50000 },
    { name: 'iPhone 15 Pro', price: 45000 },
    { name: 'iPhone 15', price: 40000 },
    { name: 'iPhone 14 Pro Max', price: 35000 },
    { name: 'iPhone 14 Pro', price: 30000 },
    { name: 'iPhone 14', price: 25000 },
    { name: 'iPhone 13 Pro Max', price: 20000 },
    { name: 'iPhone 13 Pro', price: 15000 },
    { name: 'iPhone 13', price: 10000 },
    { name: 'iPhone 12 Pro Max', price: 8000 },
    { name: 'iPhone 12 Pro', price: 7000 },
    { name: 'iPhone 12', price: 6000 },
    { name: 'iPhone 11 Pro Max', price: 5000 },
    { name: 'iPhone 11 Pro', price: 4000 }
  ];

  useEffect(() => {
    const initializeCommunication = () => {
      if ('BroadcastChannel' in window) {
        try {
          const channel = new BroadcastChannel('pos_channel');
          setBroadcastChannel(channel);
          setIsConnected(true);
          setDebugInfo('BroadcastChannel 已連接');
        } catch (error) {
          console.error('BroadcastChannel 初始化失敗:', error);
          setDebugInfo('BroadcastChannel 失敗，使用 localStorage');
          setIsConnected(true);
        }
      } else {
        console.warn('BroadcastChannel 不支援，使用 localStorage');
        setDebugInfo('BroadcastChannel 不支援，使用 localStorage');
        setIsConnected(true);
      }
    };

    initializeCommunication();

    return () => {
      if (broadcastChannel) {
        broadcastChannel.close();
      }
    };
  }, []);

  const sendMessage = (type, order) => {
    const message = { type, order };
    
    if (broadcastChannel) {
      try {
        broadcastChannel.postMessage(message);
        setDebugInfo(`已發送 ${type} 訊息`);
        console.log('已發送 BroadcastChannel 訊息:', message);
      } catch (error) {
        console.error('BroadcastChannel 發送失敗:', error);
        setDebugInfo('BroadcastChannel 發送失敗');
      }
    } else {
      // 備用方案：使用 localStorage
      try {
        localStorage.setItem('pos_currentOrder', JSON.stringify(order));
        setDebugInfo(`已儲存到 localStorage: ${order ? order.number : '清除'}`);
        console.log('已儲存到 localStorage:', order);
      } catch (error) {
        console.error('localStorage 儲存失敗:', error);
        setDebugInfo('localStorage 儲存失敗');
      }
    }
  };

  const addToOrder = (product) => {
    const newOrderItems = [...currentOrderItems, product];
    setCurrentOrderItems(newOrderItems);
    
    // 發送當前正在建立的訂單到客戶顯示器
    const currentOrderData = {
      id: 'temp',
      number: '建立中...',
      customerName: '準備中',
      total: newOrderItems.reduce((sum, item) => sum + item.price, 0),
      items: newOrderItems.map(item => item.name),
      isBuilding: true // 標記為正在建立中
    };
    
    sendMessage('BUILDING_ORDER', currentOrderData);
  };

  const createNewOrder = () => {
    if (currentOrderItems.length === 0) return;
    
    const newOrder = {
      id: orders.length + 1,
      number: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customerName: `顧客${orders.length + 1}`,
      total: currentOrderItems.reduce((sum, item) => sum + item.price, 0),
      items: currentOrderItems.map(item => item.name)
    };

    setOrders([...orders, newOrder]);
    setCurrentOrderItems([]);
    
    // 發送消息到客戶顯示器
    sendMessage('NEW_ORDER', newOrder);
  };

  const selectOrder = (order) => {
    setCurrentOrder(order);
    
    // 發送消息到客戶顯示器
    sendMessage('SELECT_ORDER', order);
  };

  const clearOrder = () => {
    setCurrentOrderItems([]);
    
    // 發送清除訊息到客戶顯示器
    sendMessage('CLEAR_ORDER', null);
  };

  const totalAmount = currentOrderItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <StaffContainer>
      <ConnectionStatus connected={isConnected}>
        {isConnected ? '已連接' : '未連接'}
      </ConnectionStatus>

      <DebugInfo>{debugInfo}</DebugInfo>

      <Header>
        <HeaderTitle>營業員操作介面</HeaderTitle>
      </Header>
      
      <Content>
        <OrderSection>
          <SectionTitle>訂單列表</SectionTitle>
          <OrderList>
            {orders.map(order => (
              <OrderItem 
                key={order.id} 
                active={currentOrder?.id === order.id}
                onClick={() => selectOrder(order)}
              >
                <OrderNumber>{order.number}</OrderNumber>
                <CustomerName>{order.customerName}</CustomerName>
                <OrderTotal>NT$ {order.total}</OrderTotal>
              </OrderItem>
            ))}
          </OrderList>
        </OrderSection>

        <ActionSection>
          <SectionTitle>新增訂單</SectionTitle>
          <ProductGrid>
            {products.map(product => (
              <ProductButton 
                key={product.name}
                onClick={() => addToOrder(product)}
              >
                {product.name}<br/>
                NT$ {product.price}
              </ProductButton>
            ))}
          </ProductGrid>

          <ActionButtons>
            <ActionButton className="primary" onClick={createNewOrder}>
              建立訂單
            </ActionButton>
            <ActionButton className="warning" onClick={clearOrder}>
              清除
            </ActionButton>
            <ActionButton className="secondary" onClick={() => sendMessage('END_SESSION', null)}>
              結束營業
            </ActionButton>
          </ActionButtons>

          {currentOrderItems.length > 0 && (
            <CurrentOrder>
              <SectionTitle>當前訂單</SectionTitle>
              <OrderItems>
                {currentOrderItems.map((item, index) => (
                  <OrderItemRow key={index}>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>NT$ {item.price}</ItemPrice>
                  </OrderItemRow>
                ))}
              </OrderItems>
              <TotalAmount>總計: NT$ {totalAmount}</TotalAmount>
            </CurrentOrder>
          )}
        </ActionSection>
      </Content>
    </StaffContainer>
  );
}

export default StaffDisplay; 