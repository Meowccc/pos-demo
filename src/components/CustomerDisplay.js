import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import communicationService from '../services/CommunicationService';

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

const ItemSku = styled.span`
  color: #7f8c8d;
  font-size: 1rem;
`;

const ItemQuantity = styled.span`
  color: #e74c3c;
  font-weight: bold;
`;

const ScanProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 120px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => {
    const percentage = (props.scanned / props.total) * 100;
    if (percentage >= 100) return '#27ae60';
    if (percentage >= 80) return '#f39c12';
    return '#3498db';
  }};
  width: ${props => Math.min((props.scanned / props.total) * 100, 100)}%;
  transition: all 0.3s ease;
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

const OrderListDisplay = styled.div`
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  border: 3px solid #f39c12;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const OrderListItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  text-align: left;
`;

const ListOrderNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const ListCustomerName = styled.div`
  font-size: 1.2rem;
  color: #7f8c8d;
`;

function CustomerDisplay() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState({ isConnected: false, connectionType: null, debugInfo: '初始化中...' });
  const [statusMessage, setStatusMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // 監聽通訊服務狀態變化
    const updateStatus = () => {
      setConnectionStatus(communicationService.getStatus());
    };

    // 處理接收到的訊息
    const handleMessage = (message) => {
      const { type, data } = message;
      
      if (type === 'SEARCH_RESULTS') {
        setOrderList(data);
        setCurrentOrder(null);
        setShowWelcome(false);
        setStatusMessage(`找到 ${data.length} 筆訂單`);
        setTimeout(() => setStatusMessage(''), 3000);
      } else if (type === 'SELECT_ORDER') {
        setCurrentOrder(data);
        setShowWelcome(false);
        setStatusMessage(`已選擇訂單: ${data.number}`);
        setTimeout(() => setStatusMessage(''), 3000);
      } else if (type === 'UPDATE_ORDER') {
        setCurrentOrder(data);
        setStatusMessage('訂單已更新');
        setTimeout(() => setStatusMessage(''), 2000);
      }
    };

    // 添加訊息監聽器
    communicationService.addListener(handleMessage);

    // 定期更新狀態
    const statusInterval = setInterval(updateStatus, 1000);
    
    // 初始更新
    updateStatus();

    return () => {
      clearInterval(statusInterval);
      communicationService.removeListener(handleMessage);
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

  const getTotalScanned = (items) => {
    return items.reduce((sum, item) => sum + item.scanned, 0);
  };

  const getTotalQuantity = (items) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CustomerContainer>
      <ConnectionStatus connected={connectionStatus.isConnected}>
        {connectionStatus.isConnected ? '已連接' : '未連接'}
        {connectionStatus.connectionType && ` (${connectionStatus.connectionType})`}
      </ConnectionStatus>

      <DebugInfo>{connectionStatus.debugInfo}</DebugInfo>

      <Header>
        <HeaderTitle>客戶顯示器</HeaderTitle>
        <Subtitle>歡迎光臨</Subtitle>
      </Header>

      <Content>
        {statusMessage && (
          <StatusMessage>{statusMessage}</StatusMessage>
        )}

        {showWelcome ? (
          <WelcomeDisplay>
            <WelcomeIcon>👋</WelcomeIcon>
            <WelcomeTitle>歡迎光臨</WelcomeTitle>
            <WelcomeSubtitle>我們很高興為您服務</WelcomeSubtitle>
            <WelcomeTime>現在時間：{formatTime()}</WelcomeTime>
          </WelcomeDisplay>
        ) : orderList.length > 0 && !currentOrder ? (
          <OrderListDisplay>
            <h2 style={{ marginBottom: '20px', color: '#d68910' }}>訂單列表</h2>
            {orderList.map(order => (
              <OrderListItem key={order.id}>
                <ListOrderNumber>{order.number}</ListOrderNumber>
                <ListCustomerName>領貨人: {order.customerName}</ListCustomerName>
              </OrderListItem>
            ))}
          </OrderListDisplay>
        ) : currentOrder ? (
          <OrderDisplay>
            <OrderHeader>
              <OrderNumber>{currentOrder.number}</OrderNumber>
              <CustomerName>領貨人: {currentOrder.customerName}</CustomerName>
              <OrderDate>{formatDate()}</OrderDate>
            </OrderHeader>

            <OrderItems>
              {currentOrder.items.map((item, index) => (
                <ItemRow key={index}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                    <ItemName>{item.name}</ItemName>
                    <ItemSku>SKU: {item.sku}</ItemSku>
                  </div>
                  <ItemQuantity>{item.scanned}/{item.quantity}</ItemQuantity>
                  <ScanProgress>
                    <ProgressBar>
                      <ProgressFill 
                        scanned={item.scanned} 
                        total={item.quantity}
                      />
                    </ProgressBar>
                  </ScanProgress>
                </ItemRow>
              ))}
            </OrderItems>

            <TotalSection>
              <TotalAmount>
                總進度: {getTotalScanned(currentOrder.items)}/{getTotalQuantity(currentOrder.items)}
              </TotalAmount>
              <ProgressBar style={{ marginTop: '10px' }}>
                <ProgressFill 
                  scanned={getTotalScanned(currentOrder.items)} 
                  total={getTotalQuantity(currentOrder.items)}
                />
              </ProgressBar>
            </TotalSection>
          </OrderDisplay>
        ) : (
          <NoOrderMessage>
            等待訂單查詢...<br/>
            請稍候
          </NoOrderMessage>
        )}
      </Content>
    </CustomerContainer>
  );
}

export default CustomerDisplay; 