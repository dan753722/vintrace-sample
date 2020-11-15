import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import useFetchBreakdownsService from './services/useFetchBreakdownsService';

import Breakdown from './Breakdown';

type WineDetailsContainerParams = { lotCode: string };

const BreakdownsContainer: FunctionComponent<RouteComponentProps<WineDetailsContainerParams>> = ({
  match,
  location,
}: RouteComponentProps<WineDetailsContainerParams>) => {
  const breakdownType = location.hash ? location.hash.slice(1) : 'year';
  const service = useFetchBreakdownsService(match.params.lotCode, breakdownType);

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && <Breakdown {...service.payload} />}
      {service.status === 'error' && (
        <div>Error, something is wrong</div>
      )}
    </div>
  );
};

export default withRouter(BreakdownsContainer);