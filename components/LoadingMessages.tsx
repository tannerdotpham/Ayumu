'use client'

import {BeatLoader} from 'react-spinners'

function LoadingMessages({ loading, color = '#fff' }: { loading?: boolean; color?: string }) {
  return loading ? (
    <p className="message ml-auto">
      <BeatLoader color={color} size={10} />
    </p>
  ) : null;
}

export default LoadingMessages