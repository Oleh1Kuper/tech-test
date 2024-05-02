import React from 'react';
import styled from '@emotion/styled';
import { CardData } from '../types/cardData';

interface WidgetProps {
  transparent?: boolean;
}

const ProgressBox = styled.div`
  display: flex;
  gap: 4px;
`;

const Widget = styled.div<WidgetProps>`
  border-radius: 2px;
  border: 1px solid #03c9a9;
  height: 8px;
  width: 64px;
  background-color: ${(props) =>
    props.transparent ? '#03C9A9' : 'transparent'};
`;

type Props = {
  cardData: CardData[];
};

const ProgressBar: React.FC<Props> = ({ cardData }) => {
  return (
    <ProgressBox>
      {cardData.map(({ id, isFilledIn }) => (
        <Widget transparent={isFilledIn} key={id} />
      ))}
    </ProgressBox>
  );
};

export default ProgressBar;
