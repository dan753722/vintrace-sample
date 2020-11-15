import React, { FunctionComponent, useState } from 'react';
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

const ShowMoreButtonContainer = styled.div`
  display: flex;
  justify-content: 'center';
  box-shadow: 0px 1px 0px #E8E8E8;  
`;

const ShowMoreButton = styled.button`
  padding: 16px;
  display: flex;
  background: transparent;
  border: 0px;
  font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 11px;
line-height: 16px;
/* identical to box height, or 145% */

display: flex;
align-items: center;

/* #00928D */

color: #00928D;
margin: auto;
&:hover {
  cursor: pointer;
}
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
  const [showMore, setShowMore] = useState(false);
  let items;
  if (showMore) {
    items = props.breakdown;
  }
  else {
    items = props.breakdown.slice(0, 5);
  }
  return (
    <BreakdownTableWrapper>
      <BreakdownItem key="title">
        <BreakdownItemTitle>{makeReadableBreakdownType(props.breakdownType)}</BreakdownItemTitle>
        <BreakdownItemTitle>Percentage</BreakdownItemTitle>
      </BreakdownItem>
      {items.map((breakdown, index) => (
        <BreakdownItem key={index}>
          <BreakdownItemTitle>
            {breakdown.key}
          </BreakdownItemTitle>
          <BreakdownItemTitle>
            {breakdown.percentage}
          </BreakdownItemTitle>
        </BreakdownItem>
      ))}
      {!showMore &&
        <ShowMoreButtonContainer>
          <ShowMoreButton
            onClick={() => setShowMore(true)}
          >
            Show more
          </ShowMoreButton>
        </ShowMoreButtonContainer>}
    </BreakdownTableWrapper>
  )
}

export default Breakdown;
