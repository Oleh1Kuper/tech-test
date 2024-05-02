import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import styled from '@emotion/styled';

const Main = styled.main`
  min-height: calc(100vh - 72px);
  padding: 40px 24px 24px;
  background-color: #F8F9F9;
`

const Layout = () => {
  return (
    <>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Layout;
