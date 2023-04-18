import { useContext } from 'react';

import { Context } from '../services/Context';

function VideoCinema({isActive, children}) {

  const value = useContext(Context);

  const style = {
    display: (isActive ? 'inline-block' : 'none')
  };

  return (
    <div className="video-cinema" style={style}>
      <h1>{value}</h1>
      {children}
    </div>
  );
}

export default VideoCinema;