import React, { useEffect } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';
import { firestore } from '../db/firestore';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import ProfilePage from './ProfilePage';
import { useTranslation } from 'react-i18next';

const Button = styled.button({
  display: 'block',
  borderRadius: '5px',
  border: '1px solid #5ACEE8',
  padding: '10px',
  background: '#fff',
  fontSize: '20px',
  letterSpacing: 1,
  color: '#5ACEE8',
  cursor: 'pointer',
  transition: 'all .3s',
  '&:hover': {
    background: '#5ACEE8',
    color: '#fff',
  },
});

const HomePage = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const { t } = useTranslation();

  const addUser = async (user: User) => {
    const userInfo = {
      ...user,
      isAuth: true,
      profile: {
        singer: {
          country: null,
          genre: null,
          singerName: null,
          isFilledIn: false,
        },
        cartoon: {
          country: null,
          genre: null,
          cartoonName: null,
          isFilledIn: false,
        },
        movie: {
          country: null,
          genre: null,
          movieName: null,
          isFilledIn: false,
        },
        userImage: {
          image: null,
          isFilledIn: false,
        },
      },
    };

    try {
      const q = query(
        collection(firestore, 'users'),
        where('email', '==', user.email),
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        await addDoc(collection(firestore, 'users'), userInfo);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      addUser(user);
    }
  }, [user]);

  if (isAuthenticated) {
    return <ProfilePage />;
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      })}
    >
      <h1>{t('translation.home.h1')}</h1>
      <Button onClick={() => loginWithRedirect()} type="button">
        {t('translation.home.login')}
      </Button>
    </div>
  );
};

export default HomePage;
