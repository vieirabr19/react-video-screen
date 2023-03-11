import { Channel } from '../services/EventService';

function VideoList({videos}){

  const handleClick = (video) => {
    Channel.emit('video:select', video);
  };

  return (
    <ul className="video-list">
      {videos.length > 0 && videos.map(video => (
        <li className="video" key={video.id} onClick={() => handleClick(video)}>
          <img src={video.img} alt={video.name} />
          <span>{video.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default VideoList;