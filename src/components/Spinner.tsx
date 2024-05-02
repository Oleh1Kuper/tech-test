import { css } from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';

const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #5acee8;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => {
  return (
    <div className={css({ display: 'flex', justifyContent: 'center' })}>
      <Loader />
    </div>
  );
};

export default Spinner;
