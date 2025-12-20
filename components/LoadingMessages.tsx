'use client'

import {BeatLoader} from 'react-spinners'

function LoadingMessages({loading}: { loading?: boolean}) {
  return loading ? (
    <p className="message ml-auto">
      <BeatLoader color='white' />
    </p>
  ) : null;
}

export default LoadingMessages