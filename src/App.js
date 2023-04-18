import React, { useEffect, useRef, useState, Component, useContext } from 'react';
import './App.css';

import VideoCinema from './components/VideoCinema';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import { VideoService } from './services/VideoService';
import { Channel } from './services/EventService';
import VideoInline from './components/VideoInline';

import { Context } from './services/Context';

function App(){
  const inlineVideoElement = useRef();
  const cinemaVideoElement = useRef();

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [videoContainerElement, setVideoContainerElement] = useState(inlineVideoElement);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const videoListApi = async () => {
      const videos = await VideoService.list();
      setVideos(videos);
    };
    
    videoListApi();
  }, []);

  useEffect(() => {
    Channel.on('video:select', selectedVideoFn);
    Channel.on('video:toggle-cinema', toggleCinema);

    return () => {
      Channel.removeListener('video:select', selectedVideoFn);
      Channel.removeListener('video:toggle-cinema', toggleCinema);
    }
  });

  const selectedVideoFn = (video) => {
    setSelectedVideo(video);
  };

  const toggleCinema = () => {
    const newContainer = videoContainerElement === inlineVideoElement ? cinemaVideoElement : inlineVideoElement;
    setVideoContainerElement(newContainer);
  }

  return (
    <div className="App">
      <Context.Provider value={[total, setTotal]}>
        <div>
          <p>App.js: { total }</p>
          <Counter />
        </div>
      </Context.Provider>

      <VideoPlayer container={videoContainerElement.current} video={selectedVideo} />

      <VideoInline>
        <div ref={inlineVideoElement}></div>
      </VideoInline>

      <VideoList videos={videos} />

      <Context.Provider value="Testando useContext">
        <VideoCinema isActive={videoContainerElement === cinemaVideoElement}>
          <div ref={cinemaVideoElement}></div>
        </VideoCinema>
      </Context.Provider>
    </div>
  );
}

function Counter() {
  const [total, setTotal] = useContext(Context);

  return (
    <div>
      <h3>Total Counter: {total}</h3>
      <button type="button" onClick={() => setTotal(total + 1)}>
        Contador
      </button>
    </div>
  );
}

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.selectedVideoFn = this.selectedVideoFn.bind(this);
//     this.toggleCinema = this.toggleCinema.bind(this);

//     this.inlineVideoElement = React.createRef();
//     this.cinemaVideoElement = React.createRef();

//     this.state = {
//       videos: [],
//       selectedVideo: {},
//       videoContainerElement: this.inlineVideoElement
//     }


//   }

//   componentDidMount() {
//     const fetchData = async () => {
//       const videos = await VideoService.list();
//       this.setState({videos});
//     };
    
//     fetchData();
    
//     Channel.on('video:select', this.selectedVideoFn);
//     Channel.on('video:toggle-cinema', this.toggleCinema);
//   }

//   componentWillUnmount() {
//     Channel.removeListener('video:select', this.selectedVideoFn);
//     Channel.removeListener('video:toggle-cinema', this.toggleCinema);
//   }

//   selectedVideoFn(video) {
//     this.setState({selectedVideo: video});
//   };

//   toggleCinema(){
//     const newContainer = this.state.videoContainerElement === this.inlineVideoElement ? this.cinemaVideoElement : this.inlineVideoElement;
//     this.setState({videoContainerElement: newContainer});
//   }

//   render(){
//     const { state } = this;

//     return (
//       <div className="App">
//         <VideoPlayer container={state.videoContainerElement.current} video={state.selectedVideo} />
  
//         <VideoInline>
//           <div ref={this.inlineVideoElement}></div>
//         </VideoInline>
  
//         <VideoList videos={state.videos} />
  
//         <VideoCinema isActive={state.videoContainerElement === this.cinemaVideoElement}>
//           <div ref={this.cinemaVideoElement}></div>
//         </VideoCinema>
//       </div>
//     );
//   }
// }

export default App;
