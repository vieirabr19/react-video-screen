import React, { useEffect, useRef, useState, Component } from 'react';
import './App.css';

import VideoCinema from './components/VideoCinema';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import { VideoService } from './services/VideoService';
import { Channel } from './services/EventService';
import VideoInline from './components/VideoInline';

class App extends Component {
  constructor(props) {
    super(props);

    this.selectedVideoFn = this.selectedVideoFn.bind(this);
    this.toggleCinema = this.toggleCinema.bind(this);

    this.inlineVideoElement = React.createRef();
    this.cinemaVideoElement = React.createRef();

    this.state = {
      videos: [],
      selectedVideo: {},
      videoContainerElement: this.inlineVideoElement
    }


  }

  // const [videos, setVideos] = useState([]);
  // const [selectedVideo, setSelectedVideo] = useState({});
  // const [videoContainerElement, setVideoContainerElement] = useState(inlineVideoElement);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const videos = await VideoService.list();
  //     setVideos(videos);
  //   };
    
  //   fetchData();
    
  //   Channel.on('video:select', selectedVideoFn);
  //   Channel.on('video:toggle-cinema', toggleCinema);
  // }, []);


  componentDidMount() {
    const fetchData = async () => {
      const videos = await VideoService.list();
      this.setState({videos});
    };
    
    fetchData();
    
    Channel.on('video:select', this.selectedVideoFn);
    Channel.on('video:toggle-cinema', this.toggleCinema);
  }

  componentWillUnmount() {
    Channel.removeListener('video:select', this.selectedVideoFn);
    Channel.removeListener('video:toggle-cinema', this.toggleCinema);
  }

  selectedVideoFn(video) {
    this.setState({selectedVideo: video});
  };

  toggleCinema(){
    const newContainer = this.state.videoContainerElement === this.inlineVideoElement ? this.cinemaVideoElement : this.inlineVideoElement;
    this.setState({videoContainerElement: newContainer});
  }

  render(){
    const { state } = this;

    return (
      <div className="App">
        <VideoPlayer container={state.videoContainerElement.current} video={state.selectedVideo} />
  
        <VideoInline>
          <div ref={this.inlineVideoElement}></div>
        </VideoInline>
  
        <VideoList videos={state.videos} />
  
        <VideoCinema isActive={state.videoContainerElement === this.cinemaVideoElement}>
          <div ref={this.cinemaVideoElement}></div>
        </VideoCinema>
      </div>
    );
  }

}

export default App;
