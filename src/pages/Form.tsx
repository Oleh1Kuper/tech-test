import React, { useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import SingerForm from '../components/forms/SingerForm';
import MovieForm from '../components/forms/MovieForm';
import CartoonForm from '../components/forms/CartoonForm';
import ImageForm from '../components/forms/ImageForm';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import useUserFromDB from '../hooks/useUserFromDB';
import Spinner from '../components/Spinner';

const Section = styled.section({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
});

const Box = styled.div({
  display: 'flex',
  gap: '10px',
  width: '350px',
});

const circleStyles = {
  width: '40px',
  height: '40px',
  color: '#5ACEE8',
  cursor: 'pointer',
};

const Form = () => {
  const [index, setIndex] = useState(0);
  const { isAuthenticated, user } = useAuth0();
  const { isLoad } = useUserFromDB(user);
  const navigate = useNavigate();

  const nextClick = () => {
    if (index !== 3) {
      setIndex(index + 1);
    }
  };
  const previousClick = () => {
    if (index) {
      setIndex(index - 1);
    }
  };

  const { t } = useTranslation();

  if (!isAuthenticated) {
    navigate('/');
  }

  if (isLoad) {
    return <Spinner />
  }

  return (
    <Section>
      <h1>{t('translation.form.h1')}</h1>

      <div
        className={css({
          display: 'flex',
          width: '350px',
          overflow: 'hidden',
        })}
      >
        <SingerForm index={index} />
        <MovieForm index={index} />
        <CartoonForm index={index} />
        <ImageForm index={index} />
      </div>

      <Box>
        <BsArrowLeftCircleFill
          onClick={previousClick}
          className={css({
            ...circleStyles,
            cursor: !index ? 'not-allowed' : 'pointer',
          })}
        />
        <BsArrowRightCircleFill
          onClick={nextClick}
          className={css({
            ...circleStyles,
            cursor: index === 3 ? 'not-allowed' : 'pointer',
          })}
        />
      </Box>
    </Section>
  );
};

export default Form;
