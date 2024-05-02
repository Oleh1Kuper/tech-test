import styled from '@emotion/styled';

export const Input = styled.input({
  display: 'block',
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  outline: 'none',
  border: '1px solid #f0f0f0',
  '&:focus': {
    borderColor: '#5ACEE8',
  },
});

export const Box = styled.div({
  marginBottom: '20px',
  width: '310px',
});

export const Error = styled.span({
  fontSize: '12px',
  color: '#E72929',
});

export const Button = styled.button({
  display: 'block',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #5ACEE8',
  padding: '10px',
  background: '#fff',
  fontSize: '16px',
  letterSpacing: 1,
  color: '#5ACEE8',
  cursor: 'pointer',
  transition: 'all .3s',
  '&:hover': {
    background: '#5ACEE8',
    color: '#fff',
  },
});
