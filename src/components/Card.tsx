import { BsCheckCircleFill } from 'react-icons/bs';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';

const CardComponent = styled.div({
  borderRadius: '4px',
  border: '1px solid #f0f0f0',
  padding: '24px',
  boxShadow: ' -1px 3px 16px 0px #959DA530',
});

const CardTitle = styled.h3({
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: 700,
  color: '#33384F',
});

const CardText = styled.p({
  fontSize: '12px',
  lineHeight: '20px',
  color: '#616B77',
});

type Props = {
  isFilledIn?: boolean;
  title: string;
  text: string;
};

const Card: React.FC<Props> = ({ isFilledIn, title, text }) => {
  return (
    <CardComponent>
      <BsCheckCircleFill
        className={css({
          width: '24px',
          height: '24px',
          marginBottom: '16px',
          color: isFilledIn ? '#03C9A9' : '#FFC100',
        })}
      />
      <CardTitle>{title}</CardTitle>

      <CardText>{isFilledIn ? text : 'Fill in your profile'}</CardText>
    </CardComponent>
  );
};

export default Card;
