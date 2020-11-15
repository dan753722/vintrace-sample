import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import useFetchWineDetailService from './services/useFetchWineDetailService';
import WineDetails from './WineDetails';
type WineDetailsContainerParams = { lotCode: string };

const WineDetailsContainer: FunctionComponent<RouteComponentProps<WineDetailsContainerParams>> = ({
  match,
}: RouteComponentProps<WineDetailsContainerParams>) => {
  const service = useFetchWineDetailService(match.params.lotCode);

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && (
        <div>
          <Link to="/search"><ArrowBackIcon style={{ fontSize: 24 }} /></Link>
          <WineDetails {...service.payload} />
        </div>
      )}
      {service.status === 'error' && (
        <div>Error, something is wrong</div>
      )}
    </div>
  );
};

export default withRouter(WineDetailsContainer);
