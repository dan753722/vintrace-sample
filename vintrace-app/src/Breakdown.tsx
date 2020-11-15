import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Breakdowns } from './services/Breakdowns';

const BreakdownTableWrapper = styled.div`
display: flex;
flex-direction: column;
padding: 0px;

/* #FFFFFF */

background: #FFFFFF;
/* #E8E8E8 */

border: 1px solid #E8E8E8;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
border-radius: 2px;
`;

const BreakdownItem = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 15px 16px;
box-shadow: 0px 1px 0px #E8E8E8;
`;

const BreakdownItemTitle = styled.div`
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 27px;
/* identical to box height, or 153% */

display: flex;
align-items: center;

/* #242525 */

color: #242525;

/* Inside Auto Layout */
margin: 4px 0px;
`;

type BreakdownProps = Breakdowns;

function makeReadableBreakdownType(breakdownType: string) {
  switch (breakdownType) {
    case 'year':
      return 'Year';
    case 'variety':
      return 'Variety';
    case 'region':
      return 'Region';
    case 'year-variety':
      return 'Year & Variety'
  }
}

const Breakdown: FunctionComponent<BreakdownProps> = (props: BreakdownProps) => {
  return (
    <BreakdownTableWrapper>
      <BreakdownItem key="title">
        <BreakdownItemTitle>{makeReadableBreakdownType(props.breakdownType)}</BreakdownItemTitle>
        <BreakdownItemTitle>Percentage</BreakdownItemTitle>
      </BreakdownItem>
      {props.breakdown.map((breakdown, index) => (
        <BreakdownItem key={index}>
          <BreakdownItemTitle>
            {breakdown.key}
          </BreakdownItemTitle>
          <BreakdownItemTitle>
            {breakdown.percentage}
          </BreakdownItemTitle>
        </BreakdownItem>
      ))}

    </BreakdownTableWrapper>
  )
}

export default Breakdown;
