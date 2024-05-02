import React from 'react';
import styled from '@emotion/styled';
import Accordion from './Accordion';

const Box = styled.div({
  padding: '40px',
});

const H2 = styled.h2({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '32px',
  fontSize: '18px',
  fontWeight: 600,
  color: '#5ACEE8',
});

const Circle = styled.span({
  display: 'block',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: '#FF453E',
});

const Announcement = () => {
  return (
    <Box>
      <H2>
        Announcements from Tipaw
        <Circle />
      </H2>

      <Accordion />
    </Box>
  );
};

export default Announcement;
