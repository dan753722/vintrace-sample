import React, { FunctionComponent, useState, MouseEvent, ChangeEvent } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import useFetchSearchResultsService from './services/useFetchSearchResultsService';
import { SearchResults } from './services/SearchResults';
import { Link } from 'react-router-dom';

const SearchPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchPageTitle = styled.div`
font-family: Montserrat;
font-style: normal;
font-weight: 300;
font-size: 26px;
line-height: 32px;
/* identical to box height, or 125% */

display: flex;
align-items: center;
text-align: center;

/* #0F1010 */

color: #0F1010;
`;

const SearchBar = styled.div`
display: flex;
flex-direction: row;
width: 624px;
height: 48px;
left: 0px;
margin-top: 24px;

background: #FFFFFF;

color: #CCCCCC;
`;

const SearchResultListContainer = styled.div`
display: flex;
flex-direction: row;
width: 624px;
left: 0px;

border-top: 1px solid #CCCCCC;
background: #FFFFFF;

color: #CCCCCC;
`;

const SearchResultList = styled.div`
padding: 0px 10px;
width: 100%;
`;

const SearchBarIconWrapper = styled.div`
  padding: 12px 12px;
`;

const SearchBarClearButtonWrapper = styled.div`
  padding: 6px 0px;;
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;
`;

const SearchResultListItem = styled(Link)`
  border-bottom: 1px solid #CCCCCC;
  width: 100%;
  padding: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
  text-decoration: none;
  color: #0F1010;
`;

const LeftListItem = styled.div`
`;

const RightListItem = styled.div`
`;

const LotCodeItem = styled.div`
  font-family: Montserrat;
font-style: normal;
font-weight: 300;
font-size: 15px;
line-height: 18px;
`;

const NonLotCodeItem = styled.div`
font-family: Montserrat;
font-style: normal;
font-weight: 300;
font-size: 13px;
line-height: 18px;
`;

const SearchContainer: FunctionComponent = () => {
  const [filter, setFilter] = useState<string>('');
  const service = useFetchSearchResultsService(filter);

  const [anchorEl, setAnchorEl] = useState<EventTarget & Element | null>(null);
  
  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setFilter('');
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <SearchPage>
      <SearchPageTitle>
        Wine Search <LocalBarIcon style={{ fontSize: 24   }} />
      </SearchPageTitle>
      <SearchBar>
        <SearchBarIconWrapper>
          <SearchIcon style={{ fontSize: 24 }} />
        </SearchBarIconWrapper>
        <StyledInputBase
          placeholder="Search by lot code and description…"
          inputProps={{ 'aria-label': 'Search by lot code and description' }}
          aria-describedby={id}
          onChange={(event) => {
            setAnchorEl(event.target);
            setFilter(event.target.value);
          }}
          value={filter}
        />
        <SearchBarClearButtonWrapper>
          <Button onClick={handleClose}>
            <ClearIcon
              style={{ fontSize: 24 }}
            />
          </Button>
        </SearchBarClearButtonWrapper>
      </SearchBar>
      {anchorEl && (
        <SearchResultListContainer>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
          <SearchResultList>
            {
              (service.payload as SearchResults).results.map((searchResult, index: number) => (
                <SearchResultListItem
                  key={index}
                  to={`/wines/${searchResult.lotCode}`}
                >
                  <LeftListItem>
                    <LotCodeItem>{searchResult.lotCode}</LotCodeItem>
                    <NonLotCodeItem>{searchResult.description}</NonLotCodeItem>
                  </LeftListItem>
                  <RightListItem>
                    <NonLotCodeItem>{searchResult.volume} L</NonLotCodeItem>
                    <NonLotCodeItem>{searchResult.tank}</NonLotCodeItem>
                  </RightListItem>
                </SearchResultListItem>
              ))
            }
          </SearchResultList>
        )}
        </SearchResultListContainer>
      )}
    </SearchPage>
  )
};

export default SearchContainer;
