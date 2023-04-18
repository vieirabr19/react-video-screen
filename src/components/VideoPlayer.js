import React, { Component, useEffect, useRef } from 'react';
import { ReactDOM } from 'react-dom/client';
import PortalReactDOM, { createPortal } from 'react-dom';

import { Channel } from '../services/EventService';

function VideoPlayer({container, video}){
  const videoElement = useRef();
  let currentTime = 0;

  const toggleCinema = () => {
    onStop();
    Channel.emit('video:toggle-cinema');
  }

  const onPlay = () => {
    videoElement.current.currentTime = currentTime;
  }

  const onStop = () => {
    currentTime = videoElement.current.currentTime;
  }

  const render = () => {
    if(!video.url){
      return '';
    }else if(!container){
      return 'Carregando...';
    }else{
      return (
        <div className="video-player">
          <video 
            src={video.url}
            onPlay={onPlay}
            onPause={onStop}
            controls 
            autoPlay 
            loop 
            ref={videoElement}
          />
          <button type="button" onClick={toggleCinema}>[ ]</button>
        </div>
      );
    }
  };

  return (container ? createPortal(render(), container) : null);
}

// class VideoPlayer extends Component {
//   constructor(props) {
//     super(props);

//     this.videoElement = React.createRef();
//     this.currentTime = 0;

//     this.toggleCinema = this.toggleCinema.bind(this);
//     this.onPlay = this.onPlay.bind(this);
//     this.onStop = this.onStop.bind(this);
//   }

//   toggleCinema(){
//     this.onStop();
//     Channel.emit('video:toggle-cinema');
//   }

//   onPlay(){
//     this.videoElement.current.currentTime = this.currentTime;
//   }

//   onStop(){
//     this.currentTime = this.videoElement.current.currentTime;
//   }

//   componentDidUpdate(prevProps){
//     if(this.props.video.url !== prevProps.video.url){
//       this.currentTime = 0;
//     }
//   }

//   render() {
//     const { container, video } = this.props;

//     if(!video.url){
//       return '';
//     }else if(!container){
//       return 'Carregando...';
//     }else{
//       const elemment = (
//         <div className="video-player">
//           <video 
//             src={video.url}
//             onPlay={this.onPlay}
//             onPause={this.onStop}
//             controls 
//             autoPlay 
//             loop 
//             ref={this.videoElement}
//           />
//           <button type="button" onClick={this.toggleCinema}>[ ]</button>
//         </div>
//       );
//       return createPortal(elemment, container);
//     }
//   }
// }

export default VideoPlayer;