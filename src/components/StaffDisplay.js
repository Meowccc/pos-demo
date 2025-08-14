import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import communicationService from '../services/CommunicationService';

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

const SearchSection = styled.div`
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

const SearchForm = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 10px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SearchButton = styled.button`
  width: 100%;
  background: #3498db;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2980b9;
  }
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

const OrderStatus = styled.div`
  color: #e74c3c;
  font-weight: bold;
  margin-top: 5px;
`;

const DetailSection = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
`;

const OrderDetailHeader = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #3498db;
`;

const SelectedOrderInfo = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
`;

const ScannerSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  border: 2px solid #3498db;
`;

const ScannerInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #3498db;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Courier New', monospace;
  text-align: center;
  letter-spacing: 2px;
  
  &:focus {
    outline: none;
    border-color: #e74c3c;
    box-shadow: 0 0 10px rgba(231, 76, 60, 0.3);
  }
`;

const ScannerLabel = styled.div`
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 8px;
  text-align: center;
`;

const ItemList = styled.div`
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
`;

const ItemRow = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  ${props => props.highlighted && `
    background: #fff3cd;
    border-left: 4px solid #f39c12;
    animation: highlight 0.5s ease-in-out;
  `}

  @keyframes highlight {
    0% { background: #fff3cd; }
    50% { background: #ffeaa7; }
    100% { background: #fff3cd; }
  }
`;

const ItemName = styled.div`
  font-weight: 500;
  color: #2c3e50;
`;

const ItemSku = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
`;

const ItemQuantity = styled.div`
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
`;

const ScanProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ScanInput = styled.input`
  width: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
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

const StatusMessage = styled.div`
  background: ${props => props.type === 'success' ? '#27ae60' : props.type === 'error' ? '#e74c3c' : '#3498db'};
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`;

function StaffDisplay() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({ isConnected: false, connectionType: null, debugInfo: '初始化中...' });
  const [scannerInput, setScannerInput] = useState('');
  const [scannerStatus, setScannerStatus] = useState('');
  const [highlightedItem, setHighlightedItem] = useState(null);
  const itemListRef = useRef(null);
  const itemRefs = useRef({});

  // 模擬訂單數據
  const mockOrders = [
    {
      id: 1,
      number: 'ORD-2024-001',
      customerName: 'User-1',
      status: '待取貨',
      items: [
        { id: 1, name: 'iPhone 15 Pro Max', sku: 'SKU1', quantity: 2, scanned: 0 },
        { id: 2, name: 'AirPods Pro', sku: 'SKU2', quantity: 1, scanned: 0 },
        { id: 3, name: 'Apple Watch Series 9', sku: 'SKU3', quantity: 1, scanned: 0 },
        { id: 4, name: 'iPad Pro 12.9', sku: 'SKU4', quantity: 1, scanned: 0 },
        { id: 5, name: 'MacBook Pro 14', sku: 'SKU5', quantity: 1, scanned: 0 },
        { id: 6, name: 'Magic Keyboard', sku: 'SKU6', quantity: 2, scanned: 0 },
        { id: 7, name: 'Magic Mouse Black', sku: 'SKU7', quantity: 1, scanned: 0 },
        { id: 8, name: 'Magic Mouse White', sku: 'SKU8', quantity: 1, scanned: 0 },
        { id: 9, name: 'iPhone 14 Pro', sku: 'SKU9', quantity: 1, scanned: 0 },
        { id: 10, name: 'iPhone 13 Pro', sku: 'SKU10', quantity: 1, scanned: 0 },
        { id: 11, name: 'iPhone 12 Pro', sku: 'SKU11', quantity: 2, scanned: 0 },
        { id: 12, name: 'iPhone 11 Pro', sku: 'SKU12', quantity: 2, scanned: 0 },
        { id: 13, name: 'iPhone 16 Pro', sku: 'SKU13', quantity: 2, scanned: 0 },
        { id: 14, name: 'iPhone 16 Pro Max', sku: 'SKU14', quantity: 2, scanned: 0 },
        { id: 15, name: 'iPhone 16', sku: 'SKU15', quantity: 2, scanned: 0 },
      ]
    },
    {
      id: 2,
      number: 'ORD-2024-002',
      customerName: 'User-2',
      status: '待取貨',
      items: [
        { id: 8, name: 'iPhone 15', sku: 'IP15-128-PINK', quantity: 1, scanned: 0 },
        { id: 9, name: 'Apple Watch Series 9', sku: 'AWS9-45-ALUM', quantity: 1, scanned: 0 }
      ]
    },
    {
      id: 3,
      number: 'ORD-2024-003',
      customerName: 'User-1',
      status: '待取貨',
      items: [
        { id: 10, name: 'iPad Pro 12.9', sku: 'IPP12-256-SPACE', quantity: 1, scanned: 0 }
      ]
    }
  ];

  useEffect(() => {
    // 監聽通訊服務狀態變化
    const updateStatus = () => {
      setConnectionStatus(communicationService.getStatus());
    };

    // 定期更新狀態
    const statusInterval = setInterval(updateStatus, 1000);
    
    // 初始更新
    updateStatus();

    return () => {
      clearInterval(statusInterval);
    };
  }, []);

  const sendMessage = (type, data) => {
    communicationService.sendMessage(type, data);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // 模擬搜尋結果
      const filteredOrders = mockOrders.filter(order => 
        order.number.includes(searchQuery) || 
        order.customerName.includes(searchQuery)
      );
      setOrders(filteredOrders);
      
      // 發送搜尋結果到客戶顯示器
      sendMessage('SEARCH_RESULTS', filteredOrders);
    }
  };

  const selectOrder = (order) => {
    setSelectedOrder(order);
    setScannerInput('');
    setScannerStatus('');
    setHighlightedItem(null);
    
    // 發送選中的訂單到客戶顯示器
    sendMessage('SELECT_ORDER', {
      number: order.number,
      customerName: order.customerName,
      items: order.items
    });
  };

  const handleScan = (itemId, scannedValue) => {
    if (!selectedOrder) return;

    const updatedOrder = {
      ...selectedOrder,
      items: selectedOrder.items.map(item => 
        item.id === itemId 
          ? { ...item, scanned: Math.min(parseInt(scannedValue) || 0, item.quantity) }
          : item
      )
    };

    setSelectedOrder(updatedOrder);
    
    // 發送更新後的訂單到客戶顯示器
    sendMessage('UPDATE_ORDER', {
      number: updatedOrder.number,
      customerName: updatedOrder.customerName,
      items: updatedOrder.items
    });
  };

  const handleScannerInput = (e) => {
    const value = e.target.value.toUpperCase();
    setScannerInput(value);
    
    if (value.length >= 3) { // 假設 SKU 至少 3 個字符
      const foundItem = selectedOrder?.items.find(item => 
        item.sku.includes(value)
      );
      
      if (foundItem) {
        // 高亮對應的品項
        setHighlightedItem(foundItem.id);
        
        // 自動滾動到對應的品項
        if (itemRefs.current[foundItem.id] && itemListRef.current) {
          itemRefs.current[foundItem.id].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
        
        // 增加掃描數量
        const updatedOrder = {
          ...selectedOrder,
          items: selectedOrder.items.map(item => 
            item.id === foundItem.id 
              ? { ...item, scanned: Math.min(item.scanned + 1, item.quantity) }
              : item
          )
        };
        
        setSelectedOrder(updatedOrder);
        setScannerStatus('success');
        
        // 發送更新後的訂單到客戶顯示器
        sendMessage('UPDATE_ORDER', {
          number: updatedOrder.number,
          customerName: updatedOrder.customerName,
          items: updatedOrder.items
        });
        
        // 清除輸入框和狀態
        setTimeout(() => {
          setScannerInput('');
          setScannerStatus('');
          setHighlightedItem(null);
        }, 1000);
        
      } else {
        setScannerStatus('error');
        setTimeout(() => {
          setScannerStatus('');
        }, 1000);
      }
    }
  };

  const getTotalScanned = (items) => {
    return items.reduce((sum, item) => sum + item.scanned, 0);
  };

  const getTotalQuantity = (items) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <StaffContainer>
      <ConnectionStatus connected={connectionStatus.isConnected}>
        {connectionStatus.isConnected ? '已連接' : '未連接'}
        {connectionStatus.connectionType && ` (${connectionStatus.connectionType})`}
      </ConnectionStatus>

      <DebugInfo>{connectionStatus.debugInfo}</DebugInfo>

      <Header>
        <HeaderTitle>訂單查詢與掃描系統</HeaderTitle>
      </Header>
      
      <Content>
        <SearchSection>
          <SectionTitle>訂單查詢</SectionTitle>
          <SearchForm>
            <SearchInput
              type="text"
              placeholder="輸入訂單號或客戶姓名"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <SearchButton onClick={handleSearch}>
              搜尋訂單
            </SearchButton>
          </SearchForm>

          <SectionTitle>訂單列表</SectionTitle>
          <OrderList>
            {orders.map(order => (
              <OrderItem 
                key={order.id} 
                active={selectedOrder?.id === order.id}
                onClick={() => selectOrder(order)}
              >
                <OrderNumber>{order.number}</OrderNumber>
                <CustomerName>{order.customerName}</CustomerName>
                <OrderStatus>{order.status}</OrderStatus>
              </OrderItem>
            ))}
          </OrderList>
        </SearchSection>

        <DetailSection>
          <SectionTitle>訂單明細</SectionTitle>
          
          {selectedOrder ? (
            <>
              <OrderDetailHeader>
                <SelectedOrderInfo>
                  <OrderNumber>{selectedOrder.number}</OrderNumber>
                  <CustomerName>領貨人: {selectedOrder.customerName}</CustomerName>
                  <OrderStatus>狀態: {selectedOrder.status}</OrderStatus>
                </SelectedOrderInfo>
              </OrderDetailHeader>

              <ScannerSection>
                <ScannerLabel>📱 SKU 掃描器</ScannerLabel>
                <ScannerInput
                  type="text"
                  placeholder="請掃描或輸入 SKU"
                  value={scannerInput}
                  onChange={handleScannerInput}
                  autoFocus
                />
                {scannerStatus && (
                  <StatusMessage type={scannerStatus}>
                    {scannerStatus === 'success' ? '✅ 掃描成功' : '❌ SKU 未找到'}
                  </StatusMessage>
                )}
              </ScannerSection>

              <ItemList ref={itemListRef}>
                {selectedOrder.items.map((item, index) => (
                  <ItemRow 
                    key={item.id}
                    ref={el => itemRefs.current[item.id] = el}
                    highlighted={highlightedItem === item.id}
                  >
                    <ItemName>{item.name}</ItemName>
                    <ItemSku>{item.sku}</ItemSku>
                    <ItemQuantity>
                      {item.scanned}/{item.quantity}
                    </ItemQuantity>
                    <ScanProgress>
                      <ScanInput
                        type="number"
                        min="0"
                        max={item.quantity}
                        value={item.scanned}
                        onChange={(e) => handleScan(item.id, e.target.value)}
                      />
                      <ProgressBar>
                        <ProgressFill 
                          scanned={item.scanned} 
                          total={item.quantity}
                        />
                      </ProgressBar>
                    </ScanProgress>
                  </ItemRow>
                ))}
              </ItemList>

              <div style={{ marginTop: '20px', padding: '15px', background: 'white', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50' }}>
                  總進度: {getTotalScanned(selectedOrder.items)}/{getTotalQuantity(selectedOrder.items)}
                </div>
                <ProgressBar style={{ marginTop: '10px' }}>
                  <ProgressFill 
                    scanned={getTotalScanned(selectedOrder.items)} 
                    total={getTotalQuantity(selectedOrder.items)}
                  />
                </ProgressBar>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
              請選擇一個訂單查看明細
            </div>
          )}
        </DetailSection>
      </Content>
    </StaffContainer>
  );
}

export default StaffDisplay; 