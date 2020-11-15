import React, { FunctionComponent } from 'react';

type WineProps = {
  lotCode: string,
  description?: string,
  volume: number,
  tank: string,
  productState?: string,
  owner: string,
}


const WineDetails: FunctionComponent<WineProps> = (props: WineProps) => {
  return (
    <div>
      <div>{props.lotCode}</div>
      <div>{props.description}</div>
      <div>
        <div>
          <div>Volume</div>
          <div>{props.volume}</div>
        </div>
        <div>
          <div>Tank code</div>
          <div>{props.tank}</div>
        </div>
        <div>
          <div>Product state</div>
          <div>{props.productState}</div>
        </div>
        <div>
          <div>Owner</div>
          <div>{props.owner}</div>
        </div>
      </div>
    </div>
  )
};

export default WineDetails;
