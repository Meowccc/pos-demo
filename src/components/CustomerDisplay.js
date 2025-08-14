import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CustomerContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  padding: 30px;
  text-align: center;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  margin: 10px 0 0 0;
  font-size: 1.2rem;
  opacity: 0.9;
`;

const Content = styled.div`
  padding: 40px;
  text-align: center;
`;

const WelcomeMessage = styled.div`
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 40px;
`;

const OrderDisplay = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  border: 3px solid #3498db;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const OrderHeader = styled.div`
  margin-bottom: 25px;
`;

const OrderNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const CustomerName = styled.div`
  font-size: 1.3rem;
  color: #7f8c8d;
  margin-bottom: 5px;
`;

const OrderDate = styled.div`
  font-size: 1rem;
  color: #95a5a6;
`;

const OrderItems = styled.div`
  margin-top: 25px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
  font-size: 1.2rem;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  font-weight: 500;
  color: #2c3e50;
`;

const ItemPrice = styled.span`
  color: #e74c3c;
  font-weight: bold;
`;

const TotalSection = styled.div`
  margin-top: 25px;
  padding-top: 20px;
  border-top: 3px solid #3498db;
`;

const TotalAmount = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
`;

const StatusMessage = styled.div`
  background: #3498db;
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const NoOrderMessage = styled.div`
  font-size: 1.5rem;
  color: #95a5a6;
  text-align: center;
  padding: 60px 20px;
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

const BuildingOrderDisplay = styled.div`
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  border: 3px solid #f39c12;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
`;

const BuildingHeader = styled.div`
  margin-bottom: 25px;
  text-align: center;
`;

const BuildingTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #d68910;
  margin-bottom: 10px;
`;

const BuildingSubtitle = styled.div`
  font-size: 1.2rem;
  color: #b7950b;
  margin-bottom: 5px;
`;

const WelcomeDisplay = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 60px 30px;
  margin-bottom: 30px;
  color: white;
  text-align: center;
  animation: fadeIn 2s ease-in;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const WelcomeIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 15px;
  font-weight: bold;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
  opacity: 0.9;
`;

const WelcomeTime = styled.div`
  font-size: 1.2rem;
  opacity: 0.8;
`;

const ClosedDisplay = styled.div`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-radius: 15px;
  padding: 60px 30px;
  margin-bottom: 30px;
  color: white;
  text-align: center;
  animation: slideIn 1s ease-out;
  
  @keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

const ClosedIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  animation: shake 0.5s ease-in-out;
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

const ClosedTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 15px;
  font-weight: bold;
`;

const ClosedSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
  opacity: 0.9;
`;

function CustomerDisplay() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState('初始化中...');
  const [isClosed, setIsClosed] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    let broadcastChannel = null;
    let localStorageInterval = null;

    const initializeCommunication = () => {
      // 嘗試使用 BroadcastChannel
      if ('BroadcastChannel' in window) {
        try {
          broadcastChannel = new BroadcastChannel('pos_channel');
          setDebugInfo('使用 BroadcastChannel');
          
          broadcastChannel.onmessage = (event) => {
            console.log('收到 BroadcastChannel 訊息:', event.data);
            setDebugInfo(`收到訊息: ${event.data.type}`);
            
            const { type, order } = event.data;
            
            if (type === 'NEW_ORDER') {
              setCurrentOrder(order);
              setShowWelcome(false);
              setIsClosed(false);
              setStatusMessage(`新訂單已建立: ${order.number}`);
              setTimeout(() => setStatusMessage(''), 3000);
            } else if (type === 'SELECT_ORDER') {
              setCurrentOrder(order);
              setShowWelcome(false);
              setIsClosed(false);
              setStatusMessage(`已選擇訂單: ${order.number}`);
              setTimeout(() => setStatusMessage(''), 3000);
            } else if (type === 'BUILDING_ORDER') {
              setCurrentOrder(order);
              setShowWelcome(false);
              setIsClosed(false);
              setStatusMessage('正在建立訂單...');
            } else if (type === 'CLEAR_ORDER') {
              setCurrentOrder(null);
              setShowWelcome(true);
              setIsClosed(false);
              setStatusMessage('訂單已清除');
              setTimeout(() => setStatusMessage(''), 3000);
            } else if (type === 'END_SESSION') {
              setCurrentOrder(null);
              setShowWelcome(false);
              setIsClosed(true);
              setStatusMessage('營業結束');
              setTimeout(() => setStatusMessage(''), 5000);
            }
          };

          setIsConnected(true);
          setDebugInfo('BroadcastChannel 已連接');
          
        } catch (error) {
          console.error('BroadcastChannel 初始化失敗:', error);
          setDebugInfo('BroadcastChannel 失敗，使用 localStorage');
          initializeLocalStorageFallback();
        }
      } else {
        console.warn('BroadcastChannel 不支援，使用 localStorage 備用方案');
        setDebugInfo('BroadcastChannel 不支援，使用 localStorage');
        initializeLocalStorageFallback();
      }
    };

    const initializeLocalStorageFallback = () => {
      // 備用方案：使用 localStorage
      localStorageInterval = setInterval(() => {
        try {
          const storedOrder = localStorage.getItem('pos_currentOrder');
          if (storedOrder) {
            const order = JSON.parse(storedOrder);
            if (order === null) {
              // 清除訂單或結束營業
              setCurrentOrder(null);
              setShowWelcome(true);
              setIsClosed(false);
              setStatusMessage('訂單已清除');
              setTimeout(() => setStatusMessage(''), 3000);
            } else {
              // 設置訂單
              setCurrentOrder(order);
              setShowWelcome(false);
              setIsClosed(false);
              if (order.isBuilding) {
                setStatusMessage('正在建立訂單...');
              } else {
                setStatusMessage(`收到訂單: ${order.number}`);
                setTimeout(() => setStatusMessage(''), 3000);
              }
            }
            setDebugInfo(`從 localStorage 讀取: ${order ? order.number : '清除'}`);
            localStorage.removeItem('pos_currentOrder');
          }
        } catch (error) {
          console.error('localStorage 讀取失敗:', error);
          setDebugInfo('localStorage 讀取失敗');
        }
      }, 1000);

      setIsConnected(true);
    };

    initializeCommunication();

    // 清理函數
    return () => {
      if (broadcastChannel) {
        broadcastChannel.close();
      }
      if (localStorageInterval) {
        clearInterval(localStorageInterval);
      }
    };
  }, []);

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <CustomerContainer>
      <ConnectionStatus connected={isConnected}>
        {isConnected ? '已連接' : '未連接'}
      </ConnectionStatus>

      <DebugInfo>{debugInfo}</DebugInfo>

      <Header>
        <HeaderTitle>客戶顯示器</HeaderTitle>
        <Subtitle>歡迎光臨</Subtitle>
      </Header>

      <Content>
        {statusMessage && (
          <StatusMessage>{statusMessage}</StatusMessage>
        )}

        {isClosed ? (
          <ClosedDisplay>
            <ClosedIcon>🏪</ClosedIcon>
            <ClosedTitle>營業結束</ClosedTitle>
            <ClosedSubtitle>感謝您的光臨</ClosedSubtitle>
            <WelcomeTime>下次再見！</WelcomeTime>
          </ClosedDisplay>
        ) : showWelcome ? (
          <WelcomeDisplay>
            <WelcomeIcon>👋</WelcomeIcon>
            <WelcomeTitle>歡迎光臨</WelcomeTitle>
            <WelcomeSubtitle>我們很高興為您服務</WelcomeSubtitle>
            <WelcomeTime>現在時間：{formatTime()}</WelcomeTime>
          </WelcomeDisplay>
        ) : currentOrder ? (
          currentOrder.isBuilding ? (
            <BuildingOrderDisplay>
              <BuildingHeader>
                <BuildingTitle>🔄 正在建立訂單</BuildingTitle>
                <BuildingSubtitle>請稍候...</BuildingSubtitle>
                <OrderDate>{formatDate()}</OrderDate>
              </BuildingHeader>

              <OrderItems>
                {currentOrder.items.map((item, index) => (
                  <ItemRow key={index}>
                    <ItemName>{item}</ItemName>
                    <ItemPrice>NT$ {getItemPrice(item)}</ItemPrice>
                  </ItemRow>
                ))}
              </OrderItems>

              <TotalSection>
                <TotalAmount>目前總計: NT$ {currentOrder.total}</TotalAmount>
              </TotalSection>
            </BuildingOrderDisplay>
          ) : (
            <OrderDisplay>
              <OrderHeader>
                <OrderNumber>{currentOrder.number}</OrderNumber>
                <CustomerName>{currentOrder.customerName}</CustomerName>
                <OrderDate>{formatDate()}</OrderDate>
              </OrderHeader>

              <OrderItems>
                {currentOrder.items.map((item, index) => (
                  <ItemRow key={index}>
                    <ItemName>{item}</ItemName>
                    <ItemPrice>NT$ {getItemPrice(item)}</ItemPrice>
                  </ItemRow>
                ))}
              </OrderItems>

              <TotalSection>
                <TotalAmount>總計: NT$ {currentOrder.total}</TotalAmount>
              </TotalSection>
            </OrderDisplay>
          )
        ) : (
          <NoOrderMessage>
            等待訂單中...<br/>
            請稍候
          </NoOrderMessage>
        )}
      </Content>
    </CustomerContainer>
  );
}

// 輔助函數：根據品項名稱獲取價格
function getItemPrice(itemName) {
  const priceMap = {
    '美式咖啡': 60,
    '拿鐵咖啡': 80,
    '卡布奇諾': 75,
    '起司蛋糕': 90,
    '提拉米蘇': 120,
    '鬆餅': 80,
    '布朗尼': 70,
    '檸檬塔': 85,
    '熱茶': 50,
  };
  return priceMap[itemName] || 0;
}

export default CustomerDisplay; 