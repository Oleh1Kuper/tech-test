import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoLanguage } from 'react-icons/io5';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import useUserFromDB from '../hooks/useUserFromDB';
import { useTranslation } from 'react-i18next';

type MenuProps = {
  isOpen: boolean;
};

const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #616b77;
`;

const UserImg = styled.img`
  dispaly: block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const Menu = styled.ul<MenuProps>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 50px;
  right: 10px;
  border: 1px solid #03c9a9;
  border-radius: 5px;
  width: 120px;
  padding: 10px;
  list-style: none;
  background: #fff;
`;

const Button = styled.button({
  marginTop: '10px',
  border: 'none',
  background: 'transparent',
  fontSize: '16px',
  textAlign: 'left',
  color: '#33384F',
  cursor: 'pointer',
});

const MenuList = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

export const icon = {
  width: '24px',
  height: '24px',
  cursor: 'pointer',
  color: '#616b77',
};

type Props = {
  handleClose?: () => void;
};

const NavMenu: React.FC<Props> = ({ handleClose = () => {} }) => {
  const { user, logout, isAuthenticated } = useAuth0();
  const { userFromDB } = useUserFromDB(user);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const lng = localStorage.getItem('lng') || 'en';
  const [languageTitle, setLanguageTitle] = useState<'English' | 'Français'>(
    lng === 'en' ? 'English' : 'Français',
  );
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const toggleUserMenu = () => {
    setIsOpenUserMenu(!isOpenUserMenu);
  };

  const toggleLanguageMenu = () => {
    setIsOpenLanguage(!isOpenLanguage);
  };

  const onLogOut = () => {
    logout();
  };

  const changeLanguage = (lng: string) => () => {
    localStorage.setItem('lng', lng);
    setLanguageTitle(lng === 'en' ? 'English' : 'Français');
    setIsOpenLanguage(false);
    i18n.changeLanguage(lng);
  };

  return (
    <MenuList>
      <Box>
        <span>{languageTitle}</span>
        <IoLanguage onClick={toggleLanguageMenu} className={css(icon)} />
        <Menu isOpen={isOpenLanguage}>
          <li>
            <Button onClick={changeLanguage('en')}>
              {t('translation.menu.en')}
            </Button>
          </li>

          <li>
            <Button onClick={changeLanguage('fr')}>
              {t('translation.menu.fr')}
            </Button>
          </li>
        </Menu>
      </Box>

      <IoIosNotificationsOutline className={css(icon)} />

      {isAuthenticated && (
        <Box>
          <UserImg src={userFromDB?.profile.userImage.image || user?.picture} />

          <span>{user?.name}</span>

          <FaAngleDown onClick={toggleUserMenu} className={css(icon)} />

          <Menu isOpen={isOpenUserMenu}>
            <li>
              <Button
                onClick={() => {
                  toggleUserMenu();
                  handleClose();
                  navigate('/form');
                }}
              >
                {t('translation.menu.profile')}
              </Button>
            </li>
            <li>
              <Button type="button" onClick={onLogOut}>
                {t('translation.menu.logout')}
              </Button>
            </li>
          </Menu>
        </Box>
      )}
    </MenuList>
  );
};

export default NavMenu;
