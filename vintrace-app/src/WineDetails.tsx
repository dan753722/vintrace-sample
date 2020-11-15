import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import BreakdownContainer from './BreakdownContainer';
import { WineDetail } from './services/WineDetail';

const WineDetailsWrapper = styled.div`
  min-width: 768px;
`;

const WineDetailsHeader = styled.div`
`;

const LotCode = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 40px;
  line-height: 45px;

  display: flex;
  align-items: center;

  color: #0F1010;
`;

const Description = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 21px;
  line-height: 32px;

  display: flex;
  align-items: flex-end;
  text-align: center;
  text-transform: capitalize;

  color: #242525;
`;

const WineSummary = styled.div`
`;

const WineSummaryItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SummaryItemTitle = styled.div`
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

const SummaryItemContent = styled.div`
font-family: Montserrat;
font-style: normal;
font-weight: 300;
font-size: 18px;
line-height: 27px;
/* identical to box height, or 153% */

display: flex;
align-items: center;
text-align: right;

/* #242525 */

color: #242525;
`;

const BreakdownNav = styled.div`
  display: flex;
  box-shadow: 0px 1px 0px #E8E8E8;
`;

const StyledNavLink = styled(NavLink)`
font-family: Montserrat;
font-style: normal;
font-weight: 300;
font-size: 15px;
line-height: 18px;
/* identical to box height, or 120% */

display: flex;
align-items: center;
text-align: center;

/* #0F1010 */

color: #0F1010;
text-decoration: none;
padding: 10px 14px;
`;

type WineProps = WineDetail;

const WineDetails: FunctionComponent<WineProps> = (props: WineProps) => {
  return (
    <WineDetailsWrapper>
      <WineDetailsHeader>
        <LotCode>{props.lotCode}</LotCode>
        <Description>{props.description}</Description>
      </WineDetailsHeader>
      <WineSummary>
        <WineSummaryItem>
          <SummaryItemTitle>Volume</SummaryItemTitle>
          <SummaryItemContent>{props.volume}</SummaryItemContent>
        </WineSummaryItem>
        <WineSummaryItem>
          <SummaryItemTitle>Tank code</SummaryItemTitle>
          <SummaryItemContent>{props.tank}</SummaryItemContent>
        </WineSummaryItem>
        <WineSummaryItem>
          <SummaryItemTitle>Product state</SummaryItemTitle>
          <SummaryItemContent>{props.productState}</SummaryItemContent>
        </WineSummaryItem>
        <WineSummaryItem>
          <SummaryItemTitle>Owner</SummaryItemTitle>
          <SummaryItemContent>{props.owner}</SummaryItemContent>
        </WineSummaryItem>
      </WineSummary>
      <BreakdownNav>
        <StyledNavLink
          to="#year"
          activeStyle={{
            boxShadow: '0px 2px 0px #00ADA8',
          }}
          isActive={(match, location) => {
            return location.hash === '#year' || location.hash === '';
            }}
        >Year</StyledNavLink>
        <StyledNavLink
          to="#variety"
          activeStyle={{
            boxShadow: '0px 2px 0px #00ADA8',
          }}
          isActive={(match, location) => {
            return location.hash === '#variety';
            }}
        >Variety</StyledNavLink>
        <StyledNavLink
          to="#region"
          activeStyle={{
            boxShadow: '0px 2px 0px #00ADA8',
          }}
          isActive={(match, location) => {
            return location.hash === '#region';
            }}
        >Region</StyledNavLink>
        <StyledNavLink
          to="#year-variety"
          activeStyle={{
            boxShadow: '0px 2px 0px #00ADA8',
          }}
          isActive={(match, location) => {
            return location.hash === '#year-variety';
            }}
        >Year & Variety</StyledNavLink>
      </BreakdownNav>
      <BreakdownContainer />
    </WineDetailsWrapper>
  )
};

export default WineDetails;
