import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import StaffDisplay from './components/StaffDisplay';
import CustomerDisplay from './components/CustomerDisplay';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Navigation = styled.nav`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  background: #2196F3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
  }
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const HomePage = styled.div`
  text-align: center;
  color: white;
  padding: 100px 20px;
`;

const HomeTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 30px;
`;

const HomeDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledLink = styled.a`
  background: #4CAF50;
  color: white;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    background: #45a049;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
`;

function App() {
  // 根據環境設定 basename
  const basename = process.env.NODE_ENV === 'production' ? '' : '';
  
  return (
    <Router basename={basename}>
      <AppContainer>
        <Navigation>
          <NavButton onClick={() => window.location.href = basename + '/'}>
            首頁
          </NavButton>
          <NavButton onClick={() => window.location.href = basename + '/staff'}>
            POS
          </NavButton>
          <NavButton onClick={() => window.location.href = basename + '/customer'}>
            客顯器
          </NavButton>
        </Navigation>

        <Routes>
          <Route path="/" element={
            <HomePage>
              <HomeTitle>POS 雙顯示器系統</HomeTitle>
              {/* <HomeDescription>
                歡迎使用雙顯示器 POS 系統<br/>
                請選擇要開啟的顯示器類型
              </HomeDescription> */}
              <LinkContainer>
                <StyledLink href={basename + '/staff'}>
                  🖥️ POS介面
                </StyledLink>
                <StyledLink href={basename + '/customer'}>
                  📺 客戶顯示器
                </StyledLink>
              </LinkContainer>
            </HomePage>
          } />
          
          <Route path="/staff" element={
            <>
              <Title>POS介面</Title>
              <StaffDisplay />
            </>
          } />
          
          <Route path="/customer" element={
            <>
              <Title>客顯器</Title>
              <CustomerDisplay />
            </>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App; 