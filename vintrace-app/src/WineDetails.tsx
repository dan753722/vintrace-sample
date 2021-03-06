import React, { FunctionComponent, useState, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Popover from '@material-ui/core/Popover';
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

const StyledFab = styled(Fab)`
  background-color: #00ADA8 !important;
  float: right;
`;

type WineProps = WineDetail;

const WineDetails: FunctionComponent<WineProps> = (props: WineProps) => {
  const [anchorEl, setAnchorEl] = useState<EventTarget & Element | null>(null);
  
  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <WineDetailsWrapper>
      <WineDetailsHeader>
        <StyledFab
          color="secondary"
          aria-label="edit"
          aria-describedby={id}
          onClick={handleClick}
        >
          <EditIcon />
        </StyledFab>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        This feature is not supported yet.
      </Popover>

        <LotCode><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.01" fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#E6D395"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#D20039"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="url(#paint0_linear)"/>
<g style={{ mixBlendMode: 'multiply' }} opacity="0.2">
<path d="M31.5 16C31.5 24.5604 24.5604 31.5 16 31.5C7.43959 31.5 0.5 24.5604 0.5 16C0.5 7.43959 7.43959 0.5 16 0.5C24.5604 0.5 31.5 7.43959 31.5 16Z" stroke="#979797"/>
</g>
<path d="M23.79 10.5L20.25 21H19.08L16.005 12.045L12.915 21H11.76L8.22004 10.5H9.36004L12.39 19.53L15.525 10.5H16.56L19.65 19.575L22.725 10.5H23.79Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear" x1="-16" y1="16" x2="16" y2="48" gradientUnits="userSpaceOnUse">
<stop stop-color="white" stop-opacity="0.5"/>
<stop offset="1" stop-color="#818181" stop-opacity="0.5"/>
</linearGradient>
</defs>
</svg>{props.lotCode}</LotCode>
        <Description>{props.description}</Description>
      </WineDetailsHeader>
      <WineSummary>
        <WineSummaryItem>
          <SummaryItemTitle>Volume</SummaryItemTitle>
          <SummaryItemContent>{props.volume} L</SummaryItemContent>
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
