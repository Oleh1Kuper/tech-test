import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CiCalendarDate } from 'react-icons/ci';
import { FaAngleDown } from 'react-icons/fa6';
import { css } from '@emotion/css';

type AccordionPorps = {
  isOpen: boolean;
};

const Accord = styled.div({
  overflow: 'hidden',
});

const AccordionTop = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '8px 8px 0 0',
  height: '48px',
  padding: '0 24px',
  background: '#5ACEE8',
  color: '#fff',
});

const AccordionSummary = styled.div<AccordionPorps>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  border: 1px solid #5acee8;
  border-radius: 0 0 8px 8px;
  padding: 16px 24px;
  color: #616b77;
`;

const Calendar = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '16px',
  color: '#5ACEE8',
});

const P = styled.p({
  fontSize: '16px',
  fontWeight: 700,
});

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Accord>
      <AccordionTop>
        <P>What is Tipaw?</P>

        <FaAngleDown
          onClick={toggleAccordion}
          className={css({
            width: '24px',
            height: '24px',
            cursor: 'pointer',
          })}
        />
      </AccordionTop>

      <AccordionSummary isOpen={isOpen}>
        <Calendar>
          <CiCalendarDate />
          <span className={css({ fontSize: '7px', lineHeight: '16px' })}>
            {new Date().toDateString()}
          </span>
        </Calendar>

        <div>
          Lorem ipsum dolor sit amet consectetur. Etiam sed non id ultrices
          tempor. Consectetur pharetra lorem vivamus eros bibendum. Sit augue
          adipiscing adipiscing est massa non neque pretium metus. Consequat
          posuere nullam eleifend viverra pellentesque sed quis. Nunc non aenean
          leo lacinia etiam enim. Turpis gravida in ornare habitant volutpat.
          Imperdiet est ut et magna amet tortor tortor. Pulvinar suspendisse
          volutpat gravida placerat posuere feugiat erat ut. Aliquam facilisis
          ornare egestas mi. Molestie mauris aliquet dolor accumsan malesuada
          nam ac enim. Praesent ut elit aliquam nunc.
        </div>
      </AccordionSummary>
    </Accord>
  );
};

export default Accordion;
