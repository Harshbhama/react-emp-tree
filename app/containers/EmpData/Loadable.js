/**
 * Asynchronously loads the component for HomePage
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import RingLoader from "react-spinners/RingLoader";

export default loadable(() => import('./index'), {
  // fallback: <LoadingIndicator />,
  fallback: <div className="sweet-loading" style={{paddingLeft: '40%', paddingTop: '20%'}}>
  <ClipLoader
    size={100}
    color={"#123abc"}
    loading={true}
    
  />
</div>
});
