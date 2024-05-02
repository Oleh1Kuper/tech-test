import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavMenu, { icon } from './NavMenu';
import { css } from '@emotion/css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';
import { removeScroll } from '../utils/removeScroll';

type AsideProps = {
  isOpen: boolean;
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  padding: 0 24px;
  box-shadow: 0px 1px 0px 0px #f0f0f0;
`;

const Aside = styled.aside<AsideProps>`
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  height: 100vh;
  padding: 10px 24px;
  background: #f0f0f0;
  transition: transform 0.3s;
  transform: ${(props) =>
    props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
`;

const linkStyle = {
  fontWeight: 600,
  fontSize: '18px',
  textDecoration: 'none',
  color: '#20253F',
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    removeScroll();
  };

  const handleClose = () => {
    setIsOpen(false);
    removeScroll();
  };

  return (
    <Nav>
      <Link className={css(linkStyle)} to="/">
        My Tipaw
      </Link>

      <div
        className={css({
          display: 'none',
          ['@media (min-width: 500px)']: {
            display: 'block',
          },
        })}
      >
        <NavMenu />
      </div>

      <div
        className={css({
          ['@media (min-width: 500px)']: {
            display: 'none',
          },
        })}
      >
        {isOpen ? (
          <IoCloseOutline
            onClick={handleClose}
            className={css({
              ...icon,
            })}
          />
        ) : (
          <RxHamburgerMenu
            onClick={handleOpen}
            className={css({
              ...icon,
            })}
          />
        )}
      </div>

      <Aside isOpen={isOpen}>
        <NavMenu handleClose={handleClose} />
      </Aside>
    </Nav>
  );
};

export default NavBar;
