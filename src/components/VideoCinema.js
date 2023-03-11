import { useState } from 'react';

function VideoCinema({isActive, children}) {
  const style = {
    display: (isActive ? 'inline-block' : 'none')
  };

  return (
    <div className="video-cinema" style={style}>
      {children}
    </div>
  );
}

export default VideoCinema;