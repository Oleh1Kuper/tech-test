import React from 'react';
import styled from '@emotion/styled';
import Card from './Card';
import { CardData } from '../types/cardData';

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  padding: '40px',
  ['@media (min-width: 600px)']: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  ['@media (min-width: 900px)']: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  ['@media (min-width: 1200px)']: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
});

type Props = {
  cardData: CardData[];
};

const CardList: React.FC<Props> = ({ cardData }) => {
  return (
    <Grid>
      {cardData.map(({ id, text, title, isFilledIn }) => (
        <Card key={id} title={title} text={text} isFilledIn={isFilledIn} />
      ))}
    </Grid>
  );
};

export default CardList;
